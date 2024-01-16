const auth = require("./auth.route");
const user = require("./user.route");

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/users", user);
}
