const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  getSongs,
  getSong,
  addSong,
  updateSong,
  deleteSong
} = require("../controllers/song.controller");

router.use(protect);

router.route("/")
  .get(getSongs)
  .post(addSong);

router.route("/:id")
  .get(getSong)
  .put(updateSong)
  .delete(deleteSong);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Song Module
 */

/**
 * @swagger
 * /songs:
 *   post:
 *     summary: Create a song
 *     tags: [Songs]
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
 *               - duration
 *               - album_id
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: string  
 *               album_id:
 *                 type: integer
 *             example:
 *               title: Fake Name
 *               duration: 03:00
 *               album_id: 1
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
 *                     name:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     album_id:
 *                       type: integer
 *                     created_at:
 *                       type: string
 *
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: album_id  
 *         schema:
 *           type: integer
 *         required: true  
 *         description: Album Id
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     duration:
 *                       type: string 
 *                     album_id:
 *                       type: integer
 *                     album_title:
 *                       type: string
 *                     release_year:
 *                       type: integer
 *                     genre:
 *                       type: string
 *                     created_at:
 *                       type: string
 */

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Get a song
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Song id
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
 *                     duration:
 *                       type: string 
 *                     album_id:
 *                       type: integer
 *                     album_title:
 *                       type: string
 *                     release_year:
 *                       type: integer
 *                     genre:
 *                       type: string
 *                     created_at:
 *                       type: string
 *
 *   put:
 *     summary: Update a song
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Song id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: string  
 *               album_id:
 *                 type: integer
 *             example:
 *               title: Fake Name
 *               duration: 03:00
 *               album_id: 1
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
 *                     duration:
 *                       type: string  
 *                     album_id:
 *                       type: integer
 *                     created_at:
 *                       type: string
 *
 *   delete:
 *     summary: Delete a song
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Song id
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
 */