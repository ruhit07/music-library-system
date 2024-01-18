const auth = require("./auth.route");
const user = require("./user.route");
const artist = require("./artist.route");
const album = require("./album.route");
const song = require("./song.route");

const docs = require("./docs.route");

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/users", user);

  app.use("/api/artists", artist);
  app.use("/api/albums", album);
  app.use("/api/songs", song);

  app.use("/api/docs", docs);
}
