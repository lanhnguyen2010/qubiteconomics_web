
import StockAPI from 'services/StockAPI';

const types = {
    FETCH_PS_OUTBOUND_SUCCESS: "FETCH_PS_OUTBOUND_SUCCESS",
    FETCH_PS_OUTBOUND_FAILURE: "FETCH_PS_OUTBOUND_FAILURE",

    FETCH_BUSD_OUTBOUND_SUCCESS: "FETCH_BUSD_OUTBOUND_SUCCESS",
    FETCH_BUSD_OUTBOUND_FAILURE: "FETCH_BUSD_OUTBOUND_FAILURE",

    FETCH_BuySellNNOutbound_SUCCESS: "FETCH_BuySellNNOutbound_SUCCESS",
    FETCH_BuySellNNOutbound_FAILURE: "FETCH_BuySellNNOutbound_FAILURE",

    FETCH_BusdNNOutbound_SUCCESS: "FETCH_BusdNNOutbound_SUCCESS",
    FETCH_BusdNNOutbound_FAILURE: "FETCH_BusdNNOutbound_FAILURE",

    FETCH_SuuF1Outbound_SUCCESS: "FETCH_SuuF1Outbound_SUCCESS",
    FETCH_SuuF1Outbound_FAILURE: "FETCH_SuuF1Outbound_FAILURE",

    FETCH_ArbitUnwind_SUCCESS: "FETCH_ArbitUnwind_SUCCESS",
    FETCH_ArbitUnwind_FAILURE: "FETCH_ArbitUnwind_FAILURE"
  };
  
  export const actions =  {
    fetchAllData: {},

    fetchPSOutboundData: async (dispatch, data) => {
      const ps = await StockAPI.fetchPSOutbound(data);
      if (!ps.error) {
        dispatch(actions.fetchPSOutboundDataSuccess(ps))
      }
    },
    fetchPSOutboundDataSuccess: (PSOutbound) => {
      return { type: types.FETCH_PS_OUTBOUND_SUCCESS, PSOutbound };
    },

    fetchBusdOutboundData: async (dispatch, data) => {
      const busd = await StockAPI.fetchBusdOutbound(data);
      if (!busd.error) {
        dispatch(actions.fetchBusdOutboundDataSuccess(busd));
      }
    },
    fetchBusdOutboundDataSuccess: (BusdOutbound) => {
      return { type: types.FETCH_BUSD_OUTBOUND_SUCCESS, BusdOutbound };
    },

    fetchBuySellNNOutboundData: async (dispatch, data) => {
      const buysellNN = await StockAPI.fetchBuySellNNOutbound(data);
      if (!buysellNN.error) {
        dispatch(actions.fetchBuySellNNOutboundDataSuccess(buysellNN));
      }
    },
    fetchBuySellNNOutboundDataSuccess: (BuySellNNOutbound) => {
      return { type: types.FETCH_BuySellNNOutbound_SUCCESS, BuySellNNOutbound };
    },
 
    fetchBusdNNOutboundData: async (dispatch, data) => {
      const busdNN = await StockAPI.fetchBusdNNOutbound(data);
      if (!busdNN.error) {
        dispatch(actions.fetchBusdNNOutboundDataSuccess(busdNN));
      } 
    },
    fetchBusdNNOutboundDataSuccess: (BusdNNOutbound) => {
      return { type: types.FETCH_BusdNNOutbound_SUCCESS, BusdNNOutbound };
    },

    fetchSuuF1OutboundData: async (dispatch, data) => {
      const suuF1 = await StockAPI.fetchSuuF1Outbound(data);
      if (!suuF1.error) {
        dispatch(actions.fetchSuuF1OutboundDataSuccess(suuF1));
      }
    },
    fetchSuuF1OutboundDataSuccess: (SuuF1Outbound) => {
      return { type: types.FETCH_SuuF1Outbound_SUCCESS, SuuF1Outbound }
    },

    fetchArbitUnwindData: async (dispatch, data) => {
      const response = await StockAPI.fetchArbitUnwind(data);
      if (!response.error) {
        dispatch(actions.fetchArbitUnwindDataSuccess(response));
      }
    },
    fetchArbitUnwindDataSuccess: (ArbitUnwind) => {
      return { type: types.FETCH_ArbitUnwind_SUCCESS, ArbitUnwind }
    }
  };
  
  const initialState = {
    PSOutbound: null,
    BusdOutbound: null,
    BuySellNNOutbound: null,
    BusdNNOutbound: null,
    SuuF1Outbound: null,
    ArbitUnwind: null,

    PSOutboundError: null,
    BusdOutboundError: null,
    BuySellNNOutboundError: null,
    BusdNNOutboundError: null,
    SuuF1OutboundError: null,
    ArbitUnwindError: null
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, PSOutbound, BusdOutbound, BuySellNNOutbound, BusdNNOutbound, SuuF1Outbound, ArbitUnwind} = action;
    switch (type) {
      case types.FETCH_PS_OUTBOUND_SUCCESS: {
        return {
          ...state,
          PSOutbound: PSOutbound.map((i) => {
            return {price: i.price, time: new Date(2021, 1, 1, parseInt(i.hour), parseInt(i.minute), parseInt(i.second))}
          }).reverse(),
          PSOutboundError: null,
        };
      }

      case types.FETCH_BUSD_OUTBOUND_SUCCESS: {
        return {
          ...state,
          BusdOutbound: BusdOutbound.BUSD.time.map((i, index) => {

            //TODO timestamp not working
            let iTimeSplit = i.split(":")
            return {
              SD: BusdOutbound.BUSD.SD[index],
              BU: BusdOutbound.BUSD.BU[index],
              NetBUSD: BusdOutbound.BUSD.Net[index],
              SMA: BusdOutbound.BUSD.SMA[index],
              time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
            }

            //return {time: new Date(timeStamp/1000000 - 7*60*60*1000), price: BuySellNNOutbound.buySell.netNN[index]}
          }).reverse(),
          BusdOutboundError: null,
        };
      }

      case types.FETCH_BuySellNNOutbound_SUCCESS: {
        return {
          ...state,
          BuySellNNOutbound: BuySellNNOutbound.buySell.time.map((i, index) => {

            //TODO timestamp not working
            let iTimeSplit = i.split(":")
            return {
              price: BuySellNNOutbound.buySell.netNN[index],
              time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
              buyPressure: BuySellNNOutbound.buySell.buyPressure[index],
              sellPressure: BuySellNNOutbound.buySell.sellPressure[index]
            }

            //return {time: new Date(timeStamp/1000000 - 7*60*60*1000), price: BuySellNNOutbound.buySell.netNN[index]}
          }).reverse(),
          BuySellNNOutboundError: null,
        };
      }

      case types.FETCH_BusdNNOutbound_SUCCESS: {
        return {
          ...state,
          BusdNNOutbound: BusdNNOutbound,
          BusdNNOutboundError: null,
        };
      }

      case types.FETCH_SuuF1Outbound_SUCCESS: {
        return {
          ...state,
          SuuF1Outbound: SuuF1Outbound.map((i) => {

            //TODO timestamp not working
            let iTimeSplit = i.time.split(":")
            return {
              price: i.last,
              foreignerBuyVolume: i.foreignerBuyVolume,
              foreignerSellVolume: i.foreignerSellVolume,
              BidV: i.totalBidVolume,
              AskV  : i.totalOfferVolume,
              NetBA : i.Net_BA,
              SMA : i.SMA,
              NetBS : i['Net_BU&SD2'],
              time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2]))
            }

          }).reverse(),
          SuuF1OutboundError: null,
        };
      }

      case types.FETCH_ArbitUnwind_SUCCESS: {
        return {
          ...state,
          ArbitUnwind: ArbitUnwind.unwind.time.map((i, index) => {

            let iTimeSplit = i.split(":")
            return {
              time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
              radius: ArbitUnwind.unwind.radius[index],
              label: ArbitUnwind.unwind.label[index],
              x: ArbitUnwind.unwind.x[index],
              y: ArbitUnwind.unwind.y[index],
              num_lots: ArbitUnwind.unwind.num_lots[index]
            }

            //return {time: new Date(timeStamp/1000000 - 7*60*60*1000), price: BuySellNNOutbound.buySell.netNN[index]}
          }).reverse(),
          Arbit: ArbitUnwind.arbit.time.map((i, index) => {

            let iTimeSplit = i.split(":")
            return {
              time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
              radius: ArbitUnwind.arbit.radius[index],
              label: ArbitUnwind.arbit.label[index],
              x: ArbitUnwind.arbit.x[index],
              y: ArbitUnwind.arbit.y[index],
              num_lots: ArbitUnwind.arbit.num_lots[index]
            }

            //return {time: new Date(timeStamp/1000000 - 7*60*60*1000), price: BuySellNNOutbound.buySell.netNN[index]}
          }).reverse(),
          ArbitUnwindError: null,
        };
      }
  
      default:
        return state;
    }
  };
  
  
  