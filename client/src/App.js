// import logo from './logo.svg';
// import './App.css';
import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ChatHomepage from "./pages/chat/chatHomepage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { Context } from "./utils/context";
// import Profile from "./pages/profile/profile";
// import Navbar from "./components/navbar/Navbar";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const { user } = useContext(Context);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <ChatHomepage />
            {/* {user ? <ChatHomepage /> : <Login />} */}
          </Route>
          <Route exact path="/login">
            <Login />
            {/* {user ? <Redirect to="/" /> : <Login />} */}
          </Route>
          <Route exact path="/register">
            <Register />
            {/* {user ? <Redirect to="/" /> : <Register />} */}
          </Route>
          {/* <Route exact path="/profiles/:username">
              <Profile />
            </Route> */}
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
