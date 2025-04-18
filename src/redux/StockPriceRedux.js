
import StockAPI from 'services/StockAPI';
import DataParser from 'common/DataParser';

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
          PSOutbound: DataParser.parsePSOutbound(PSOutbound),
          PSOutboundError: null,
        };
      }

      case types.FETCH_BUSD_OUTBOUND_SUCCESS: {
        return {
          ...state,
          BusdOutbound: DataParser.parseBusdOutbound(BusdOutbound),
          VNIndex30: DataParser.parseVN30Index(BusdOutbound),
          BusdOutboundError: null,
        };
      }

      case types.FETCH_BuySellNNOutbound_SUCCESS: {
        return {
          ...state,
          BuySellNNOutbound: DataParser.parseBuySellNNOutbound(BuySellNNOutbound),
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
          SuuF1Outbound: DataParser.parseSuuF1Outbound(SuuF1Outbound),
          SuuF1OutboundError: null,
        };
      }

      case types.FETCH_ArbitUnwind_SUCCESS: {
        return {
          ...state,
          ArbitUnwind: DataParser.parseArbitUnwind(ArbitUnwind),
          Arbit: DataParser.parseArbit(ArbitUnwind),
          ArbitUnwindError: null,
        };
      }
  
      default:
        return state;
    }
  };
  
  
  