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
