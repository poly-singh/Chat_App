const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const User = require("./models/User");
const Message = require("./models/Message");
const typeDefs = require("./schemas/typeDefs");
const { signToken } = require("./utils/auth");

(async () => {
  const PORT = process.env.PORT || 4000;
  const pubsub = new PubSub();
  const app = express();
  const httpServer = createServer(app);

  // Resolver map
  const NEW_USER = "NEW_USER";

  const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate("messages");
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate("messages");
      },
      messages: async (parent, { username }) => {
        const params = username ? { messageAuthor: username } : {};
        return Message.find(params).sort({ createdAt: 1 });
      },
      // Find all messages.
      message: async (parent, { messageId }) => {
        return Message.findOne({ _id: messageId });
      },
    },
    Mutation: {
      addUser: async (parent, { username, email, password }, context) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);

        return { token, user };
      },

      addMessage: async (parent, { messageText }, context) => {
        // TODO
        if (!context.user) {
          // remove the "!" for auth to work!!!
          const message = await Message.create({
            messageText,
            // messageAuthor: context.user.username,
            messageAuthor: "aldwin2",
          });

          const userMessage = await User.findOneAndUpdate(
            // { _id: context.user._id },
            { _id: "612449f2d9323303a4374fd1" }, // Comment out in prod
            { $addToSet: { messages: message._id } }
          );

          pubsub.publish("NEW_MESSAGE", { newMessage: message });
          return message;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    },
    Subscription: {
      newMessage: {
        subscribe: () => pubsub.asyncIterator("NEW_MESSAGE"),
      },
    },
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  const server = new ApolloServer({
    schema,
  });
  await server.start();
  server.applyMiddleware({ app });
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

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
})();
