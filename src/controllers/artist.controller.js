const ErrorResponse = require("../utils/error-response.utils");
const asyncHandler = require("../middlewares/async.middleware");
const { knex } = require('../config/db');

const { createArtistSchema, updateArtistSchema } = require("../validation/artist.validation");

// @desc      Get List of all artists
// @route     GET /api/artists
// @access    Private
exports.getArtists = asyncHandler(async (req, res, next) => {

  const { rows: artists } = await knex.raw(
    `
      select 
        ar.id,
        ar.name,
        ar.created_at,
        coalesce(jsonb_agg(
          jsonb_build_object(
            'id', a.id, 
            'title', a.title, 
            'release_year', a.release_year, 
            'genre', a.genre 
          )
        ) filter(where a.id is not null), '[]') as albums
      from artists ar
      left join albums_artists aa on ar.id = aa.artist_id
      left join albums a on aa.album_id = a.id
      group by ar.id, ar.name, ar.created_at;
    `
  );

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

  const { rows: [artist] } = await knex.raw(
    `
      select 
        ar.id,
        ar.name,
        ar.created_at,
        coalesce(jsonb_agg(
          jsonb_build_object(
            'id', a.id, 
            'title', a.title, 
            'release_year', a.release_year, 
            'genre', a.genre 
          )
        ) filter(where a.id is not null), '[]') as albums
      from artists ar
      left join albums_artists aa on ar.id = aa.artist_id
      left join albums a on aa.album_id = a.id
      where ar.id = ?
      group by ar.id, ar.name, ar.created_at;
    `
    , [req.params.id]);

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
    `insert into artists (name, created_at) values (?, ?) returning *`,
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

  const { rows: [artist] } = await knex.raw('select * from artists where id = ?', [req.params.id]);
  if (!artist) {
    return next(new ErrorResponse(`No Artist with the id of ${req.params.id}`, 404));
  }

  const reqBody = await updateArtistSchema(req.body);

  const updateValue = {};
  if (reqBody.name) updateValue.name = reqBody.name;

  const columns = Object
    .keys(updateValue)
    .map(column => `${column} = :${column}`)
    .join(', ');

  const { rows: [newArtist] } = await knex.raw(
    `update artists SET ${columns} where id = :id returning *`,
    { ...updateValue, id: req.params.id }
  );

  res.status(200).json({
    success: true,
    message: `Artist with the id ${req.params.id} updated successfully`,
    data: newArtist,
  });
});

// @desc      Delete Artist
// @route     delete /api/artists/:id
// @access    Private
exports.deleteArtist = asyncHandler(async (req, res, next) => {

  const { rows: [artist] } = await knex.raw('select * from artists where id = ?', [req.params.id]);
  if (!artist) {
    return next(new ErrorResponse(`No artist with the id of ${req.params.id}`, 404));
  }

  await knex.raw('delete from artists where id = ?', [req.params.id]);

  res.status(200).json({
    success: true,
    message: `Artist with the id ${req.params.id} deleted successfully`,
    data: {},
  });
});

