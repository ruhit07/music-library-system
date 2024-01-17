const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth.middleware');
const { jwtConfig } = require('../middlewares/jwt-config.middleware');

const {
  register,
  login,
  logout,
} = require('../controllers/auth.conteroller');

router.use(jwtConfig);

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', protect, logout);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
* @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: At least 6
 *             example:
 *               name: Fake Name
 *               username: fake
 *               password: "123456"
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         username:
 *                           type: string
 *                         created_at:
 *                           type: string
 *                     token:
 *                       type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: fake
 *               password: "123456"
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         username:
 *                           type: string
 *                         created_at:
 *                           type: string
 *                     token:
 *                       type: string
 */

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout
 *     tags: [Auth]
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
 *                 data:
 *                   type: object
 */