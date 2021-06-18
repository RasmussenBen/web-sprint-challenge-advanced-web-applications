import React, { useState } from "react";
import { useHistory } from 'react-router'
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  let history = useHistory()

  const [error, setError] = useState({
    error: ''
  })
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (state.username === '' || state.password === '') {
      setError('Please enter username and password')
    }

    axios.post('http://localhost:5000/api/login', {
      username: state.username,
      password: state.password
    })
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      history.pushState('/protected')
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Login Here</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            id='username'
            value={state.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            id='password'
            value={state.password}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.