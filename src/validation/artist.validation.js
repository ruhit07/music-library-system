
const Joi = require('joi');
const moment = require('moment');
const ErrorResponse = require('../utils/error-response.utils');

const createArtistSchema = (reqBody) => {
  const data = reqBody;

  let dataSchema = {
    name: Joi.string().required(),
    created_at: Joi.date().default(moment()),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


const updateArtistSchema = (reqBody) => {
  const data = reqBody;

  const dataSchema = {
    name: Joi.string(),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


module.exports = {
  createArtistSchema,
  updateArtistSchema
}