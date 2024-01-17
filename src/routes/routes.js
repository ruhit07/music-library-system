const auth = require("./auth.route");
const user = require("./user.route");
const artist = require("./artist.route");

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/users", user);

  app.use("/api/artists", artist);
}
