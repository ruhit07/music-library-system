const ErrorResponse = require("../utils/error-response.utils");
const asyncHandler = require("../middlewares/async.middleware");
const { knex } = require('../config/db');

const { createArtistSchema, updateArtistSchema } = require("../validation/artist.validation");

// @desc      Get List of all artists
// @route     GET /api/artists
// @access    Private
exports.getArtists = asyncHandler(async (req, res, next) => {

  const { rows: artists } = await knex.raw('SELECT * FROM artists');

  return res.status(200).json({
    success: true,
    message: `List of all artists`,
    count: artists.length,
    data: artists,
  });
});

// @desc      Get single artist
// @route     GET /api/artists/:id
// @access    Private
exports.getArtist = asyncHandler(async (req, res, next) => {

  const { rows: [artist] } = await knex.raw('SELECT * FROM artists WHERE id = ?', [req.params.id]);
  if (!artist) {
    return next(new ErrorResponse(`No Artist with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: `Artist of id ${req.params.id}`,
    data: artist,
  });
});

// @desc      Create Artist
// @route     POST /api/artists
// @access    Private
exports.addArtist = asyncHandler(async (req, res, next) => {

  const reqBody = await createArtistSchema(req.body);
  const { name, created_at } = reqBody;

  const { rows: [artist] } = await knex.raw(
    `INSERT INTO artists (name, created_at) VALUES (?, ?) RETURNING *`,
    [name, created_at]
  );

  res.status(201).json({
    success: true,
    message: `Artist created successfully`,
    data: artist,
  });
});

// @desc      Update Artist
// @route     PUT /api/artists/:id
// @access    Private
exports.updateArtist = asyncHandler(async (req, res, next) => {

  const { rows: [artist] } = await knex.raw('SELECT * FROM artists WHERE id = ?', [req.params.id]);
  if (!artist) {
    return next(new ErrorResponse(`No Artist with the id of ${req.params.id}`, 404));
  }

  const reqBody = await updateArtistSchema(req.body);

  const updateValue = {};
  if (reqBody.name) updateValue.name = reqBody.name;
  if (reqBody.updated_at) updateValue.updated_at = reqBody.updated_at;

  const updateColumns = Object
    .keys(updateValue)
    .map(column => `${column} = :${column}`)
    .join(', ');

  const { rows: [newArtist] } = await knex.raw(
    `UPDATE artists SET ${updateColumns} WHERE id = :id RETURNING *`,
    { ...updateValue, id: req.params.id }
  );

  res.status(200).json({
    success: true,
    message: `Artist with the id ${req.params.id} updated successfully`,
    data: newArtist,
  });
});

// @desc      Delete Artist
// @route     DELETE /api/artists/:id
// @access    Private
exports.deleteArtist = asyncHandler(async (req, res, next) => {

  const { rows: [artist] } = await knex.raw('SELECT * FROM artists WHERE id = ?', [req.params.id]);
  if (!artist) {
    return next(new ErrorResponse(`No artist with the id of ${req.params.id}`, 404));
  }

  await knex.raw('DELETE FROM artists WHERE id = ?', [req.params.id]);

  res.status(200).json({
    success: true,
    message: `Artist with the id ${req.params.id} deleted successfully`,
    data: {},
  });
});

