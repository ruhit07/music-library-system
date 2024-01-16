const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { knex } = require('../config/db');
const config = require('../config/config');
const ErrorResponse = require('../utils/error-response.utils');
const asyncHandler = require('../middlewares/async.middleware');

const { registerUserSchema, loginUserSchema } = require('../validation/auth.validation');


// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {

  const reqBody = await registerUserSchema(req.body);
  const { name, username, password, created_at } = reqBody;

  // Check for user
  const { rows: [existUser] } = await knex.raw('SELECT * FROM users WHERE username = ?', [username]);
  if (existUser) {
    return next(new ErrorResponse(`Username already exists`, 400));
  };

  // Create user
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const { rows: [user] } = await knex.raw(
    `INSERT INTO users (name, username, password, created_at) VALUES (?, ?, ?, ?) RETURNING *`,
    [name, username, hashPassword, created_at]
  );

  // Create token and back response
  sendTokenResponse(user, 201, 'Registration successfull', res);
});

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {

  const reqBody = await loginUserSchema(req.body);
  const { username, password } = reqBody;

  // Check for user
  const { rows: [user] } = await knex.raw('SELECT * FROM users WHERE username = ?', [username]);
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  };

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);;
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token and back response
  sendTokenResponse(user, 200, 'Login successfull', res);
});

// @desc      Logout user 
// @route     DELETE /api/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {

  Object.entries(req.cookies).forEach(([key, value]) => res.clearCookie(key));

  res.status(200).json({
    success: true,
    message: "Logout successfully",
    data: {}
  });
});

//  create token and send response
const sendTokenResponse = (user, statusCode, message, res) => {

  // Create token
  const token = jwt.sign({
    id: user.id,
  }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES }); // in days

  const options = {
    expires: new Date(
      Date.now() + config.COOKIE_EXPIRES * 24 * 60 * 60 * 1000 // 1 day = 24 * 60 * 60 * 1000 ms
    ),
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      data: {
        user,
        token
      }
    });
};