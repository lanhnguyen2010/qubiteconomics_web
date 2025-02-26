import React from 'react';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.backendUrl = process.env.REACT_APP_BACKEND_URL;
  }

  handleGoogleLogin = () => {
    window.location.href = `${this.backendUrl}/auth/google`;
  };

  render() {
    return (
      <div style={styles.container}>
        <h1>Login Page</h1>
        <button onClick={this.handleGoogleLogin} style={styles.loginButton}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            style={styles.googleLogo}
          />
          <span>Login with Google</span>
        </button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  googleLogo: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
};

export default LoginScreen;
