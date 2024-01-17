const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  getArtists,
  getArtist,
  addArtist,
  updateArtist,
  deleteArtist
} = require("../controllers/artist.controller");

router.use(protect);

router.route("/")
  .get(getArtists)
  .post(addArtist);

router.route("/:id")
  .get(getArtist)
  .put(updateArtist)
  .delete(deleteArtist);

module.exports = router;
