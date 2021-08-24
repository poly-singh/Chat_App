import "./login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../chat-app-logo.jpg"

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
// import { Context } from "../../utils/context";

import Auth from "../../utils/auth";

// export default function Login()
const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  // const [state, dispach] = Context()

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      props.setUser(data.login)
      // dispach({type: "LOGIN_SUCCESS", payload: data.login})
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chat App</h3>
          <span className="loginDesc">Become a Chatter today!</span>
          <div>
            <img class="chat-app-logo" src={image} alt="chat_app"/>
          </div>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            {data ? (
              <p>
                Success! You may now head <Link to="/">to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  placeholder="Your Email"
                  className="loginInput"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  placeholder="Your Password"
                  className="loginInput"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="loginButton">Log In</button>
                <span className="loginForgotten">Forgot Password?</span>
                <button href="/register" className="loginRegisterButton">
                  Create a New Account
                </button>
              </form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
