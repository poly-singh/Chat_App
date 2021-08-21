module.exports = function (server) {
  return require("socket.io")(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        // these were from the other people's project
        // im assuming we add the herokuapp account that we will be using?
        // `nicksnpcs.herokuapp.com:*`,
        // `innv2-staging.herokuapp.com:*`,
        // `innattheedge.herokuapp.com:*`,
        // `innv2.herokuapp.com:*`,
      ],
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header", "heroku-session-affinity"],
      credentials: true,
    },
  });
};
