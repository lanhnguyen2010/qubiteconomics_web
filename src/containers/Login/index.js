/** @format */
import {connect} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {
    TextField,
    Button
  } from '@material-ui/core';


function LoginScreen({navigation, loginSuccess}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onClickLogin = () => {
        console.log("onclickLogin aaaa");
        console.log("onclickLogin " + JSON.stringify(username));
        loginSuccess({username: username, password: password});
    };

  return (
    <div>
        <TextField
        onChange={(text) => {
            setUsername(text);
            setPassword(text)
        }}
        />
        <Button
        onClick={onClickLogin}>Login</Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  const {actions} = require("../../redux/UserRedux");
  return {
      loginSuccess: (payload) => dispatch(actions.loginSuccess(payload)),
      loginError: (errorMessage) => dispatch(actions.loginFailure(errorMessage))
  };
};

export default connect(
    null,
  mapDispatchToProps
)(LoginScreen);