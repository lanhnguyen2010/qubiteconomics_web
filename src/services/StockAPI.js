import Constants from "common/Constants";
import { request } from "services/request";

const StockAPI = {
    fetchPSOutbound: async () => {
        return await request(Constants.BASE_URL + Constants.PS_OUTBOUND_URL);
    },

    fetchBusdOutbound: async () => {
        return await request(Constants.BASE_URL + Constants.BUSD_OUTBOUND_URL);
    },

    fetchBuySellNNOutbound: async () => {
        return await request(Constants.BASE_URL + Constants.BUYSELL_NN_OUTBOUND_URL);
    },

    fetchBusdNNOutbound: async () => {
        return await request(Constants.BASE_URL + Constants.BUSD_NN_OUTBOUND_URL);
    },

    fetchSuuF1Outbound: async () => {
        return await request(Constants.BASE_URL + Constants.SUU_F1_OUTBOUND_URL);
    },

    fetchArbitUnwind: async () => {
        return await request(Constants.BASE_URL + Constants.ARBIT_UNWIND_URL);
    }
}

export default StockAPI;