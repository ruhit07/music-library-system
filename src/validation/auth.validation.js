
const Joi = require('joi');
const moment = require('moment');
const ErrorResponse = require('../utils/error-response.utils');

const registerUserSchema = (reqBody) => {
  const data = reqBody;

  let dataSchema = {
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),    
    created_at: Joi.date().default(moment()),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};

const loginUserSchema = (reqBody) => {
  const data = reqBody;

  let dataSchema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


module.exports = {
  registerUserSchema,
  loginUserSchema
}