const ErrorResponse = require("../utils/error-response.utils");
const asyncHandler = require("../middlewares/async.middleware");
const { knex } = require('../config/db');

const { createSongSchema, updateSongSchema } = require("../validation/song.validation");

// @desc      Get List of all songs
// @route     GET /api/songs
// @access    Private
exports.getSongs = asyncHandler(async (req, res, next) => {
  const { album_id } = req.query;

  const { rows: songs } = await knex.raw(
    `
      select 
        s.title,
        s.duration,
        s.album_id,
        s.created_at,
        a.title album_title,
        a.release_year,
        a.genre
      from songs s
      left join albums a on a.id = s.album_id
      where s.album_id = ?
    `, [album_id]
  );

  return res.status(200).json({
    success: true,
    message: `List of all songs`,
    count: songs.length,
    data: songs,
  });
});

// @desc      Get single song
// @route     GET /api/songs/:id
// @access    Private
exports.getSong = asyncHandler(async (req, res, next) => {

  const { rows: [song] } = await knex.raw(
    `
      select 
        s.title,
        s.duration,
        s.album_id,
        a.title album_title,
        a.release_year,
        a.genre
      from songs s
      left join albums a on a.id = s.album_id
      where s.id = ?
    `, [req.params.id]
  );
  if (!song) {
    return next(new ErrorResponse(`No Song with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: `Song of id ${req.params.id}`,
    data: song,
  });
});

// @desc      Create Song
// @route     POST /api/songs
// @access    Private
exports.addSong = asyncHandler(async (req, res, next) => {

  const reqBody = await createSongSchema(req.body);
  const { title, duration, album_id, created_at } = reqBody;

  const { rows: [song] } = await knex.raw(
    `insert into songs (title, duration, album_id, created_at) values (?, ?, ?, ?) returning *`,
    [title, duration, album_id, created_at]
  );

  res.status(201).json({
    success: true,
    message: `Song created successfully`,
    data: song,
  });
});

// @desc      Update Song
// @route     PUT /api/songs/:id
// @access    Private
exports.updateSong = asyncHandler(async (req, res, next) => {

  const { rows: [song] } = await knex.raw('select * from songs where id = ?', [req.params.id]);
  if (!song) {
    return next(new ErrorResponse(`No Song with the id of ${req.params.id}`, 404));
  }

  const reqBody = await updateSongSchema(req.body);

  const updateValue = {};
  if (reqBody.title) updateValue.title = reqBody.title;
  if (reqBody.duraton) updateValue.duraton = reqBody.duraton;
  if (reqBody.album_id) updateValue.album_id = reqBody.album_id;

  const columns = Object
    .keys(updateValue)
    .map(column => `${column} = :${column}`)
    .join(', ');

  const { rows: [newSong] } = await knex.raw(
    `update songs SET ${columns} where id = :id returning *`,
    { ...updateValue, id: req.params.id }
  );

  res.status(200).json({
    success: true,
    message: `Song with the id ${req.params.id} updated successfully`,
    data: newSong,
  });
});

// @desc      Delete Song
// @route     delete /api/songs/:id
// @access    Private
exports.deleteSong = asyncHandler(async (req, res, next) => {

  const { rows: [song] } = await knex.raw('select * from songs where id = ?', [req.params.id]);
  if (!song) {
    return next(new ErrorResponse(`No song with the id of ${req.params.id}`, 404));
  }

  await knex.raw('delete from songs where id = ?', [req.params.id]);

  res.status(200).json({
    success: true,
    message: `Song with the id ${req.params.id} deleted successfully`,
    data: {},
  });
});

