/** @format */

import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

// You have to import every reducers and combine them.
import { reducer as UserRedux } from "./UserRedux";
import { reducer as StockPriceRedux} from './StockPriceRedux';


const config = {key: "root",
storage,
blacklist: [
  "netInfo",
  "toast",
  "nav",
  "layouts",
  "payment",
  "sideMenu",
  "filters",
]}

export default persistCombineReducers(config, {
  user: UserRedux,
  stockPrice: StockPriceRedux
});