import React,{useState} from "react";

const axios = require('axios')
const Login = props => {
  const getCredintials = async e => {
    e.preventDefault()
    const cred = {
      username: "Lambda School",
      password: "i<3Lambd4"
    };
    const res = await axios.post('http://localhost:5000/api/login',{...cred})
    const key = res.data.payload
    await window.localStorage.setItem("key",key)
    await props.setStorage(window.localStorage.getItem("key", key));
    props.history.push('/bubbles')
  }
  return (
    <>
      <form onSubmit={getCredintials}>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />
        <input type="submit" value='Submit' required />
      </form>
    </>
  );
};

export default Login;
