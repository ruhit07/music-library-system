const ErrorResponse = require("../utils/error-response.utils");
const asyncHandler = require("../middlewares/async.middleware");
const { knex } = require('../config/db');

const { createAlbumSchema, updateAlbumSchema } = require("../validation/album.validation");

// @desc      Get List of all albums
// @route     GET /api/albums
// @access    Private
exports.getAlbums = asyncHandler(async (req, res, next) => {

  const { rows: albums } = await knex.raw(
    `
      select 
        a.id,
        a.title,
        a.release_year,
        a.genre,
        a.created_at,
        jsonb_agg(jsonb_build_object('id', ar.id, 'name', ar.name)) as artists
      from albums a
      left join albums_artists aa on a.id = aa.album_id
      left join artists ar on aa.artist_id = ar.id
      group by a.id, a.title, a.release_year, a.genre, a.created_at;
    `
  );

  return res.status(200).json({
    success: true,
    message: `List of all albums`,
    count: albums.length,
    data: albums,
  });
});

// @desc      Get single album
// @route     GET /api/albums/:id
// @access    Private
exports.getAlbum = asyncHandler(async (req, res, next) => {

  const { rows: [album] } = await knex.raw(
    `
      select 
        a.id,
        a.title,
        a.release_year,
        a.genre,
        a.created_at,
        jsonb_agg(jsonb_build_object('id', ar.id, 'name', ar.name)) as artists
      from albums a
      left join albums_artists aa on a.id = aa.album_id
      left join artists ar on aa.artist_id = ar.id
      where a.id = ?
      group by a.id, a.title, a.release_year, a.genre, a.created_at;
    ` , [req.params.id]
  );

  if (!album) {
    return next(new ErrorResponse(`No Album with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: `Album of id ${req.params.id}`,
    data: album,
  });
});

// @desc      Create Album
// @route     POST /api/albums
// @access    Private
exports.addAlbum = asyncHandler(async (req, res, next) => {

  const reqBody = await createAlbumSchema(req.body);
  const { title, release_year, genre, artist_ids, created_at } = reqBody;

  let result;

  try {
    await knex.transaction(async (transaction) => {
      const { rows: [album] } = await transaction.raw(
        `
          insert into albums 
          (title, release_year, genre, created_at) 
          values (?, ?, ?, ?) 
          returning *
        `,
        [title, release_year, genre, created_at]
      );
      result = album;

      if (artist_ids.length) {
        result.albums_artists = await Promise.all(
          artist_ids.map(async (artist_id) => {

            const { rows: [albumArtist] } = await transaction.raw(
              `
                insert into albums_artists 
                (album_id, artist_id, created_at) 
                values (?, ?, ?) 
                returning *
              `,
              [result.id, artist_id, created_at]
            );

            return albumArtist;
          })
        );
      }

      await transaction.commit();
    });
  } catch (err) {
    return next(new ErrorResponse(`Transaction rollback: ${err.message}`, 500));
  }

  res.status(201).json({
    success: true,
    message: `Album created successfully`,
    data: result,
  });
});

// @desc      Update Album
// @route     PUT /api/albums/:id
// @access    Private
exports.updateAlbum = asyncHandler(async (req, res, next) => {

  const { rows: [album] } = await knex.raw('select * from albums where id = ?', [req.params.id]);
  if (!album) {
    return next(new ErrorResponse(`No Album with the id of ${req.params.id}`, 404));
  }

  const reqBody = await updateAlbumSchema(req.body);
  let result;

  try {
    await knex.transaction(async (transaction) => {
      const updateValue = {};
      if (reqBody.title) updateValue.title = reqBody.title;
      if (reqBody.genre) updateValue.genre = reqBody.genre;
      if (reqBody.release_year) updateValue.release_year = reqBody.release_year;

      const columns = Object
        .keys(updateValue)
        .map(column => `${column} = :${column}`)
        .join(', ');

      const { rows: [album] } = await transaction.raw(
        `update albums SET ${columns} where id = :id returning *`,
        { ...updateValue, id: req.params.id }
      );

      result = album

      if (reqBody.artist_ids?.length) {
        await transaction.raw('delete from albums_artists where album_id = ?', [req.params.id]);

        result.albums_artists = await Promise.all(
          reqBody.artist_ids.map(async (artist_id) => {

            const { rows: [albumArtist] } = await transaction.raw(
              `
                insert into albums_artists 
                (album_id, artist_id, created_at) 
                values (?, ?, ?) 
                returning *
              `,
              [result.id, artist_id, result.created_at]
            );

            return albumArtist;
          })
        );
      }

      await transaction.commit();
    });
  } catch (err) {
    return next(new ErrorResponse(`Transaction rollback: ${err.message}`, 500));
  }


  res.status(200).json({
    success: true,
    message: `Album with the id ${req.params.id} updated successfully`,
    data: result,
  });
});

// @desc      Delete Album
// @route     delete /api/albums/:id
// @access    Private
exports.deleteAlbum = asyncHandler(async (req, res, next) => {

  const { rows: [album] } = await knex.raw('select * from albums where id = ?', [req.params.id]);
  if (!album) {
    return next(new ErrorResponse(`No album with the id of ${req.params.id}`, 404));
  }

  try {
    await knex.transaction(async (transaction) => {
      await transaction.raw('delete from albums where id = ?', [req.params.id]);
      await transaction.raw('delete from albums_artists where album_id = ?', [req.params.id]);
      await transaction.commit();
    });
  } catch (err) {
    return next(new ErrorResponse(`Transaction rollback: ${err.message}`, 500));
  }

  res.status(200).json({
    success: true,
    message: `Album with the id ${req.params.id} deleted successfully`,
    data: {},
  });
});

