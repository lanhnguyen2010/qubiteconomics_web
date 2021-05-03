import json
import os
import pickle
from datetime import datetime as dt
from copy import deepcopy

import numpy as np
import pandas as pd


############################### PS ###############################

def load_ps_from_pickle(DAY, as_dict=False):
    with open(f'{DAY}_ps.pickle', 'rb') as f:
        ps_dic = pickle.load(f)
    if as_dict: return ps_dic['orders']
    df_ps = pd.DataFrame(ps_dic['orders'])
    return df_ps


def compute_ps(DAY, range_time):
    # Load data
    df_ps = load_ps_from_pickle(DAY)
    # Filter data by range of time
    df_ps['time'] = df_ps.apply(lambda x:ps_merge_time(x), axis=1)
    df_ps = resample_by_range_time(df_ps,range_time,time_column='time')
    output = df_ps.to_json(orient="records")
    return output


############################### BUSD ###############################

def load_busd_day_data_from_pickle(DAY, as_dict=False):
    with open(f'{DAY}_busd.pickle', 'rb') as f:
        busd_dic = pickle.load(f)
    if as_dict: return busd_dic
    df_busd = pd.DataFrame(busd_dic['BUSD'])
    df_vn30_index = pd.DataFrame(busd_dic['VN30Index'])
    return df_busd, df_vn30_index


def compute_busd(DAY, range_time):
    # Load data
    df_busd, df_vn30_index = load_busd_day_data_from_pickle(DAY)
    # Filter data by range of time
    df_busd = resample_by_range_time(df_busd,range_time,time_column='time')
    print(df_busd.head(5))
    df_vn30_index = resample_by_range_time(df_vn30_index,range_time,time_column='timestamp')
    print(df_vn30_index.head(5))
    output = {
        "BUSD": {
            "index":df_busd['index'].tolist(),
            "BU":df_busd['BU'].tolist(),
            "SD": df_busd['SD'].tolist(),
            "Net": df_busd['Net'].tolist(),
            "SMA": df_busd['SMA'].tolist(),
            "timeFirst": df_busd['timeFirst'].tolist(),
            "time": df_busd['time'].tolist()
        },
        "VN30Index":{
            "last": df_vn30_index['last'].tolist(),
            "timestamp": df_vn30_index['timestamp'].tolist(),
        }
    }
    return json.dumps(output)


############################### BUSD - NN removed thoathuan ###############################
def load_busd_nn_data_from_pickle(DAY, as_dict=False):
    with open(f'{DAY}_busd_nn.pickle', 'rb') as f:
        busd_nn_dic = pickle.load(f)
    if as_dict: return busd_nn_dic
    df_busd_nn = pd.DataFrame(busd_nn_dic)
    return df_busd_nn

def compute_busd_nn(DAY, range_time):
    # Load data
    df_busd_nn = load_busd_nn_data_from_pickle(DAY)
    # Filter and compute data by range of time
    # print(df_busd_nn.head(5))
    df_busd_nn.fillna(method='ffill')
    df_busd_nn["netNN"] = df_busd_nn['nnBuy'] - df_busd_nn['nnSell']
    df_busd_nn = resample_by_range_time(df_busd_nn,range_time,time_column='time')
    print(df_busd_nn)
    output = df_busd_nn.to_json(orient="records")
    return output


############################### F1 Dashboard ###############################
def load_f1_from_pickle(DAY, as_dict=False):
    with open(f'{DAY}_f1_dashboard.pickle', 'rb') as f:
        f1_dic = pickle.load(f)
    if as_dict: return f1_dic[0]['data']
    df_f1 = pd.DataFrame(f1_dic[0]['data'])
    return df_f1

def compute_f1_dashboard(DAY, range_time):
    df_f1 = load_f1_from_pickle(DAY)
    df_f1["time"] = pd.to_datetime(DAY + df_f1['time'],format='%Y_%m_%d%H%M%S')\
                        .dt.tz_localize('UTC')\
                        .dt.tz_convert('Asia/Bangkok')\
                        .apply(lambda d: d.replace(tzinfo=None).strftime("%H:%M:%S"))

    df_f1['Net_BA'] = df_f1['totalBidVolume'] - df_f1['totalOfferVolume']
    df_f1['SMA'] = df_f1['Net_BA'].rolling(window=5).mean()
    df_f1 = resample_by_range_time(df_f1,range_time,time_column='time')
    output = df_f1.to_json(orient="records")
    return output

############################### VN30 ###############################
def load_vn30_from_pickle(DAY, as_dict=False):
    with open(f'{DAY}_vn30.pickle', 'rb') as f:
        vn30_dic = json.loads(pickle.load(f))
    if as_dict: return vn30_dic
    df_vn30 = pd.DataFrame(vn30_dic)
    return df_vn30

def compute_vn30_dashboard(DAY, range_time):
    vn30_dic = load_vn30_from_pickle(DAY,as_dict=True)

    df_buySell = pd.DataFrame(vn30_dic["buySell"])[['buyPressure', 'sellPressure', 'nnBuy', 'nnSell', 'time', 'index']]
    df_buySell = time_zone_corrector(df_buySell)
    df_buySell = resample_by_range_time(df_buySell,range_time,time_column='time')

    df_volume = pd.DataFrame(vn30_dic["volumes"])
    if type(df_volume['time'][0]) == np.int64: df_volume['time'] = df_volume['time']\
        .map(lambda x: dt.fromtimestamp(x / 1000_000_000))
    df_volume['t'] = df_volume['time'].dt.tz_localize('Asia/Bangkok').dt.tz_convert('UTC')\
        .apply(lambda d: d.replace(tzinfo=None))
    df_volume['time'] = df_volume['t'].map(lambda x: x.strftime("%H:%M:%S"))
    df_volume[['t', 'time']]

    df_buySell['netNN'] = df_buySell['nnBuy'] - df_buySell['nnSell']
    for x in ['totalValue', 'nnSell', 'nnBuy']: df_volume[x] = df_volume[x].diff(1).fillna(0)
    
    df_volume = resample_by_range_time(df_volume,range_time,time_column='time')

    return json.dumps({"buySell":  to_dict(df_buySell), "volumes": to_dict(df_volume)})
    # output = df_f1.to_json(orient="records")
    # return output

############################### Arbit/Unwind ###############################
def load_arbit_unwind_pickle(DAY, as_dict=False):
    with open(f'{DAY}_arbit.pickle', 'rb') as f:
        arbit_dic = pickle.load(f)
    if as_dict: return arbit_dic[0]['data']
    df_arbit = pd.DataFrame(arbit_dic[0]['data'])
    return df_arbit

def compute_arbit_unwind(DAY, range_time, multiplier=1):
    arbit_dic = load_arbit_unwind_pickle(DAY,as_dict=True)
    arbit_data, unwind_data, one = arbit_dic['sources_arbit'], arbit_dic['sources_unwind'], arbit_dic['data']
    df_arbit, df_unwind = pd.DataFrame(arbit_data['circles']), pd.DataFrame(unwind_data['circles'])
    df_arbit['radius'] *= multiplier
    df_unwind['radius'] *= multiplier
    df_arbit = resample_by_range_time(df_arbit,range_time,time_column='time')
    df_unwind = resample_by_range_time(df_unwind,range_time,time_column='time')
    return json.dumps({"arbit":  to_dict(df_arbit), "unwind": to_dict(df_unwind)})

############################### Utils ###############################
def resample_by_range_time(df_raw, range_time, time_column='time'):
    df = deepcopy(df_raw)
    if time_column =='time':
        times = df[time_column].values
        times_filtered = times[(range_time[0]<=times) & (times<=range_time[1])]
        if len(times_filtered) > 0 :
            out_df = deepcopy(df[df['time'].isin(list(times_filtered))])
            out_df.reset_index(drop=True,inplace=True)
            return out_df
        else:
            return df
    elif time_column =='timestamp':
        times = df['timestamp'].apply(lambda x: dt.fromtimestamp(x-3600*7).strftime('%H:%M:%S')).values
        times_filtered = times[(range_time[0]<=times) & (times<=range_time[1])]
        if len(times_filtered) > 0 :
            out_df = deepcopy(df[df['timestamp'].isin(list(times_filtered))])
            out_df.reset_index(drop=True,inplace=True)
            return out_df
        else:
            return df
def time_zone_corrector(df):
    if type(df['time'][0]) == dict and '$date' in df['time'][0]:
        df['t'] = df['time'].map(lambda x: dt.fromtimestamp(list(x.values())[0] / 1000))
    elif type(df['time'][0]) == np.int64:
        df['t'] = df['time'].map(lambda x: dt.fromtimestamp(x / 1_000_000_000)) \
            .dt.tz_localize('Asia/Bangkok') \
            .dt.tz_convert('UTC') \
            .apply(lambda d: d.replace(tzinfo=None))
    df['time'] = df["t"].map(lambda x: x.strftime("%H:%M:%S"))
    return df

def ps_merge_time(x):
    return f'{int(x["hour"]):02d}:{int(x["minute"]):02d}:{int(x["second"]):02d}'
def to_dict(df): return {key: df[key].values.tolist() for key in df}