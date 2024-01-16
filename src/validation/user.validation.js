
const Joi = require('joi');
const moment = require('moment');
const ErrorResponse = require('../utils/error-response.utils');

const createUserSchema = (reqBody) => {
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


const updateUserSchema = (reqBody) => {
  const data = reqBody;

  const dataSchema = {
    name: Joi.string(),
    username: Joi.string(),
    updated_at: Joi.date().default(moment()),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


module.exports = {
  createUserSchema,
  updateUserSchema
}