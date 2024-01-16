const asyncHandler = require('../middlewares/async.middleware');


// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
 
});


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {

});


// @desc      Logout user 
// @route     DELETE /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {

});


//  create token and send response
const sendTokenResponse = (user, statusCode, message, res) => { 

};