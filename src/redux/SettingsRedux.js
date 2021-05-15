
const types = {
    UPDATE_SELETED_DATE: "UPDATE_SELETED_DATE",
    UPDATE_TIME_RANGE: "UPDATE_TIME_RANGE"
  };
  
  export const actions =  {

    updateSelectedDate: (selectedDate) => {
        return { type: types.UPDATE_SELETED_DATE, selectedDate }
    },
    updateTimeRange: (timeRange) => {
        return { type: types.UPDATE_TIME_RANGE, timeRange }
    }
  };
  
  const initialState = {
    selectedDate: '2021_05_04',
    timeRange: null,
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, selectedDate, timeRange } = action;
    switch (type) {
      case types.UPDATE_SELETED_DATE: {
        return {
          ...state,
          selectedDate: selectedDate,
        };
      }
      case types.UPDATE_TIME_RANGE: {
        return {
            ...state,
            timeRange: timeRange,
          };
      }
      default:
        return state;
    }
  };
  
  
  