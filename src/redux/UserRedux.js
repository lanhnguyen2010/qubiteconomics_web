
// import UserAPI from '@services/UserAPI'
 const types = {
   LOGIN_SUCCESS: "LOGIN_SUCCESS",
   LOGIN_FAILURE: "LOGIN_FAILURE",

 
 };
 
 export const actions = {
   loginSuccess: (loginResp) => {
     return { type: types.LOGIN_SUCCESS, loginResp };
   },
   loginFailure: (error) => {
     return { type: types.LOGIN_FAILURE, error };
   }
 };
 
 const initialState = {
    loginResp: "",
    error: ""
 };
 
 export const reducer = (state = initialState, action) => {
   const { type, loginResp } = action;
   switch (type) {
     case types.LOGIN_SUCCESS: {
       return {
         ...state,
         loginResp: loginResp || {},
         error: null,
       };
     }
 
     default:
       return state;
   }
 };
 
 
 