
import {priceData} from '../components/Candlestick/priceData';

const types = {
    FETCH_PRICE_DATA_SUCCESS: 'FETCH_PRICE_DATA_SUCCESS',
    FETCH_PRICE_DATA_FAILURE: 'FETCH_PRICE_DATA_FAILURE',

    FETCH_volume_DATA_SUCCESS: 'FETCH_volume_DATA_SUCCESS',
    FETCH_volume_DATA_FAILURE: 'FETCH_volume_DATA_FAILURE'
 
  
  };
  
  export const actions = {
    fetchPriceData: (dispatch) => {
      console.log("fetch data");  
      fetch("http://113.161.34.115:5022/end-point", {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {   
          console.log(result);     
          dispatch(actions.fetchPriceDataSuccess(result));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )

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
     volumeData: []
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, priceData } = action;
    switch (type) {
      case types.FETCH_PRICE_DATA_SUCCESS: {
        return {
          ...state,
          priceData: priceData,
          volumeData: priceData.map(({time, volume}) => ({time : time, value: volume})),
          error: null,
        };
      }
  
      default:
        return state;
    }
  };
  
  
  