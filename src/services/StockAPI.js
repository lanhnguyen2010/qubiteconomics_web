import Constants from "common/Constants";
import { requestPost } from "services/request";

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
    }
}


export default StockAPI;