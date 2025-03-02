import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthServiceClient } from '../../grpc/auth_grpc_web_pb';
import { GoogleAuthRequest } from '../../grpc/auth_pb';


const client = new AuthServiceClient(process.env.REACT_APP_ENVOY_URL);


function LoginScreen() {
  const request = new GoogleAuthRequest();
  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    request.setIdToken(credentialResponse.credential);
    client.googleAuth(request, {}, (err, response) => {
      if (err) {
        console.error('gRPC Error:', err);
        return;
      }
      console.log('gRPC Response:', response.toObject());
    });
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default LoginScreen;
