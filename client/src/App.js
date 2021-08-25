// import logo from './logo.svg';
// import './App.css';
import React, { useState, useContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
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

const httpLink = new HttpLink({
  // uri: (process.env.GRAPHQL_API)? `http://${process.env.GRAPHQL_API}:4000/graphql`: "http://localhost:4000/graphql",
  uri: "http://localhost:4000/graphql",

});

const wsLink = new WebSocketLink({
  // uri: (process.env.GRAPHQL_API) ? `ws://${process.env.GRAPHQL_API}:4000/graphql` :"ws://localhost:4000/graphql",
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
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

const httpAuthLink = authLink.concat(httpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpAuthLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  console.log(process.env.REACT_APP_GRAPHQL_API);
  // const { user } = useContext(Context);
  const [user, setUser] = useState();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <ChatHomepage /> */}
            {localStorage.getItem("id_token") ? (
              <ChatHomepage user={user} />
            ) : (
              <Login setUser={setUser} />
            )}
          </Route>
          <Route exact path="/login">
            {/* <Login /> */}
            {localStorage.getItem("id_token") ? (
              <Redirect to="/" />
            ) : (
              <Login setUser={setUser} />
            )}
          </Route>
          <Route exact path="/register">
            {/* <Register /> */}
            {localStorage.getItem("id_token") ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
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
