
import StockAPI from 'services/StockAPI';

const types = {
    FETCH_VN30_PRICE_DATA_SUCCESS: 'FETCH_PRICE_DATA_SUCCESS',
    FETCH_VN30_PRICE_DATA_FAILURE: 'FETCH_PRICE_DATA_FAILURE',

    FETCH_volume_DATA_SUCCESS: 'FETCH_volume_DATA_SUCCESS',
    FETCH_volume_DATA_FAILURE: 'FETCH_volume_DATA_FAILURE'
 
  
  };
  
  export const actions =  {
    fetchPriceVN30Data: async (dispatch) => {
      console.log("fetch data");  
      
      await StockAPI.loadVN30Price()
      .then((result) => {
        console.log("VN 30 price: ", result);
        dispatch(actions.fetchPriceDataSuccess(result));     
       });
    },
    fetchPriceDataSuccess: (priceVN30Data) => {
        return { type: types.FETCH_VN30_PRICE_DATA_SUCCESS, priceVN30Data};
    },
    fetchPriceDataFailure: (error) => {
        return { type: types.FETCH_VN30_PRICE_DATA_FAILURE, error};
    },

  };
  
  const initialState = {
     priceData: [],
     error: null,
     volumeData: [],
     openPrice: []
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, priceVN30Data } = action;
    switch (type) {
      case types.FETCH_VN30_PRICE_DATA_SUCCESS: {
        return {
          ...state,
          priceVN30Data: priceVN30Data,
          error: null,
        };
      }
  
      default:
        return state;
    }
  };
  
  
  