
const jwt = require('jsonwebtoken');
const { knex } = require('../config/db');
const config = require('../config/config');
const asyncHandler = require('./async.middleware');
const ErrorResponse = require('../utils/error-response.utils');

// 401 - Unauthorized, 403 - Forbidden
exports.protect = asyncHandler(async (req, res, next) => {

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else {
    // Set token from cookie
    token = req.cookies?.token;
  }
  // console.log(token);

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // console.log(decoded, "decoded");
    const { rows: [user] } = await knex.raw(
      'select * from users where id = ?',
      [decoded.id]
    );

    req.user = user
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});