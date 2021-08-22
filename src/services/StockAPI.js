import Constants from "common/Constants";
import { requestPost, request } from "services/request";

const StockAPI = {
    fetchPSOutbound: async (data) => {
        return await requestPost(Constants.BASE_URL + Constants.PS_OUTBOUND_URL, data);
    },

    fetchVN30IndexdOutbound: async (data) => {
        return await requestPost(Constants.BASE_URL + Constants.VN30_INDEX_URL, data);
    },

    fetchBusdOutbound: async (data) => {
        return await requestPost(Constants.BASE_URL + Constants.BUSD_OUTBOUND_URL, data);
    },

    fetchBuySellNNOutbound: async (data) => {
        return await requestPost(Constants.BASE_URL + Constants.BUYSELL_NN_OUTBOUND_URL, data);
    },

    fetchBusdNNOutbound: async (data) => {
        return await requestPost(Constants.BASE_URL + Constants.BUSD_NN_OUTBOUND_URL, data);
    },

    fetchSuuF1Outbound: async (data) => {
        return await requestPost(Constants.BASE_URL + Constants.SUU_F1_OUTBOUND_URL, data);
    },

    fetchArbitUnwind: async (data) => {
        return await requestPost(Constants.BASE_URL + Constants.ARBIT_UNWIND_URL, data);
    },

    fetchCandlestick: async (data) => {
        return await request("https://canvasjs.com/data/docs/ltceur2018.json", data);
    }

}


export default StockAPI;