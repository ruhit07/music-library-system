const asyncHandler = require('./async.middleware');
 
// 401 - Unauthorized, 403 - Forbidden

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
   
});