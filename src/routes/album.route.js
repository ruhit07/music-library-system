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



/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Album Module
 */

/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Create an album
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - release_year
 *               - genre
 *               - artist_ids
 *             properties:
 *               title:
 *                 type: string
 *               release_year:
 *                 type: integer
 *               genre:
 *                 type: string
 *               artist_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               title: Fake Title
 *               release_year: 2002
 *               genre: Something
 *               artist_ids:
 *                   - 1
 *                   - 2
 *                   - 3
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     release_year:
 *                       type: integer
 *                     genre:
 *                       type: string
 *                     created_at:
 *                       type: string
 *
 *   get:
 *     summary: Get all albums
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       release_year:
 *                         type: integer
 *                       genre:
 *                         type: string
 *                       created_at:
 *                         type: string
 */

/**
 * @swagger
 * /albums/{id}:
 *   get:
 *     summary: Get an album
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Album id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     release_year:
 *                       type: integer
 *                     genre:
 *                       type: string
 *                     created_at:
 *                       type: string
 *
 *   put:
 *     summary: Update an album
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Album id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               release_year:
 *                 type: integer
 *               genre:
 *                 type: string
 *               artist_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               title: Fake Title
 *               release_year: 2002
 *               genre: Something
 *               artist_ids:
 *                 - 1
 *                 - 2
 *                 - 3
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     release_year:
 *                       type: integer
 *                     genre:
 *                       type: string
 *                     created_at:
 *                       type: string
 *
 *   delete:
 *     summary: Delete an album
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Album id
 *     responses:
 *       "204":
 *         description: No Content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
