const config = require('../config/config');
const ErrorResponse = require('../utils/error-response.utils');

exports.jwtConfig = (req, res, next) => {
  const jwtPrivateKey = config.JWT_SECRET;
 
  if(!jwtPrivateKey){
    return next(new ErrorResponse('JWT_PRIVATE_KEY is not defined.', 500));
  } 

  next();
};

