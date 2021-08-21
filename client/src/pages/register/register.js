import "./register.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Register = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chat App</h3>
          <span className="loginDesc">Become a Chatter today!</span>
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
                  placeholder="Your Username"
                  className="loginInput"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
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
                <button className="loginButton" type="submit">
                  Sign Up
                </button>
                {/* TODO: need to take user to the login page */}
                <button className="loginRegisterButton">
                  Log into Account
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

export default Register;
