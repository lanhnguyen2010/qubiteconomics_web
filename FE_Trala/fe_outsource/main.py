import json
from flask import Flask, request, abort, jsonify
from process import (
    compute_busd,
    compute_busd_nn,
    compute_f1_dashboard,
    compute_vn30_dashboard,
    compute_arbit_unwind,
    compute_ps,
)
from bson.json_util import loads, dumps

app = Flask(__name__)

# Main
PORT = 5025
PS_OUTBOUND_URL = "/api/ps-outbound"
BUYSELL_NN_OUTBOUND_URL = "/api/bs-nn-outbound"
# Suu BUSD
BUSD_NN_OUTBOUND_URL = "/api/busd-nn-outbound"
BUSD_OUTBOUND_URL = "/api/busd-outbound"
# Suu F1
SUU_F1_OUTBOUND_URL = "/api/suu-f1-outbound"
# Arbit/Unwind
ARBIT_UNWIND_URL = "/api/arbit-unwind-outbound"
# TIME_URL
TIME_URL = "/api/DAYtime"
DAY = "2021_04_07"
RANGE_TIME = ["09:00:00", "15:00:00"]


def change_date_time(data):
    global DAY, RANGE_TIME

    if not data:
        return

    if "day" in data.keys():
        DAY = data["day"]
    else:
        DAY = "2021_04_07"

    if "rangeTime" in data.keys():
        RANGE_TIME = data["rangeTime"]
    else:
        RANGE_TIME = ["09:00:00", "15:00:00"]


###################### PS ######################
@app.route(PS_OUTBOUND_URL, methods=["POST"])
def data_ps_ohlc_outbound():
    if request.method == "POST":
        data = request.json
        change_date_time(data)

        return compute_ps(DAY=DAY, range_time=RANGE_TIME)


###################### BUSD ######################
@app.route(BUSD_NN_OUTBOUND_URL, methods=["POST"])
def data_busd_nn_outbound():
    if request.method == "POST":
        data = request.json
        change_date_time(data)

        return compute_busd_nn(DAY=DAY, range_time=RANGE_TIME)


@app.route(BUSD_OUTBOUND_URL, methods=["POST"])
def data_busd_outbound():
    if request.method == "POST":
        data = request.json
        change_date_time(data)

        return compute_busd(DAY=DAY, range_time=RANGE_TIME)


###################### F1 Dashboard ######################
@app.route(SUU_F1_OUTBOUND_URL, methods=["POST"])
def data_suu_f1_outbound():
    if request.method == "POST":
        data = request.json
        change_date_time(data)

        return compute_f1_dashboard(DAY=DAY, range_time=RANGE_TIME)


###################### VN30 ######################
@app.route(BUYSELL_NN_OUTBOUND_URL, methods=["POST"])
def data_vn30_outbound():
    if request.method == "POST":
        data = request.json
        change_date_time(data)

        return compute_vn30_dashboard(DAY=DAY, range_time=RANGE_TIME)


###################### Arbit/Unwind Dashboard ######################
@app.route(ARBIT_UNWIND_URL, methods=["POST"])
def data_arbit_unwind_outbound():
    if request.method == "POST":
        data = request.json
        change_date_time(data)

        return compute_arbit_unwind(DAY=DAY, range_time=RANGE_TIME)


###################### Set date ######################
@app.route(TIME_URL, methods=["POST"])
def DAYtime_response():
    if request.method == "POST":
        from bson.json_util import loads, dumps

        data = request.json
        global DAY, RANGE_TIME
        DAY = data["day"]
        RANGE_TIME = data["rangeTime"]
        print(DAY)
        print(RANGE_TIME)
        return {}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
