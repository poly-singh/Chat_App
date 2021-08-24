const express = require("express");
const { createServer } = require("http");
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require("apollo-server-express");
// const { PubSub } = require("graphql-subscriptions");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
// const http = require ("http");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: authMiddleware,
})
const server = new ApolloServer({
  schema
});

<<<<<<< HEAD
server.start()
=======
// socket.io
// const io = require("./config/io-config")(server);
// require("./controllers/socketController")(io);

>>>>>>> main
server.applyMiddleware({ app });

// // socket.io
// const io = require("./config/io-config")(httpServer);
// // console.log(io)
// require("./controllers/socketController")(io);
const subscriptionServer = SubscriptionServer.create({
  // This is the `schema` we just created.
  schema,
  // These are imported from `graphql`.
  execute,
  subscribe,
}, {
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // This `server` is the instance returned from `new ApolloServer`.
  path: server.graphqlPath,
});

// Shut down in the case of interrupt and termination signals
// We expect to handle this more cleanly in the future. See (#5074)[https://github.com/apollographql/apollo-server/issues/5074] for reference.
['SIGINT', 'SIGTERM'].forEach(signal => {
 process.on(signal, () => subscriptionServer.close());
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
  // httpServer.listen(3002,async () => {
  //   console.log("socketio 3002")
  
});
