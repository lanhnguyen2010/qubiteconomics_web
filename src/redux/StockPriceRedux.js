
import {priceData} from '../components/Candlestick/priceData';

const types = {
    FETCH_PRICE_DATA_SUCCESS: 'FETCH_PRICE_DATA_SUCCESS',
    FETCH_PRICE_DATA_FAILURE: 'FETCH_PRICE_DATA_FAILURE',

    FETCH_VOLUMN_DATA_SUCCESS: 'FETCH_VOLUMN_DATA_SUCCESS',
    FETCH_VOLUMN_DATA_FAILURE: 'FETCH_VOLUMN_DATA_FAILURE'
 
  
  };
  
  export const actions = {
    fetchPriceData: (dispatch) => {
        dispatch(actions.fetchPriceDataSuccess(priceData));

    },
    fetchPriceDataSuccess: (priceData) => {
        return { type: types.FETCH_PRICE_DATA_SUCCESS, priceData};
    },
    fetchPriceDataFailure: (error) => {
        return { type: types.FETCH_PRICE_DATA_FAILURE, error};
    },

  };
  
  const initialState = {
     priceData: [],
     error: null,
     volumnData: []
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, priceData } = action;
    switch (type) {
      case types.FETCH_PRICE_DATA_SUCCESS: {
        return {
          ...state,
          priceData: priceData,
          error: null,
        };
      }
  
      default:
        return state;
    }
  };
  
  
  