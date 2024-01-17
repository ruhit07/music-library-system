const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  getAlbums,
  getAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum
} = require("../controllers/album.controller");

router.use(protect);

router.route("/")
  .get(getAlbums)
  .post(addAlbum);

router.route("/:id")
  .get(getAlbum)
  .put(updateAlbum)
  .delete(deleteAlbum);

module.exports = router;



