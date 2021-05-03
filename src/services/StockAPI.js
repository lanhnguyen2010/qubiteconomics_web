import { BASE_URL, VN30_LAST, VN30_PRICE } from "common/Constants";
import { request } from "./request";

const StockAPI = {
    loadVN30Price: async () => {
        return await request(BASE_URL + VN30_PRICE);
    }
}

export default StockAPI;