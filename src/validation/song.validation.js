
const Joi = require('joi');
const moment = require('moment');
const ErrorResponse = require('../utils/error-response.utils');

const createSongSchema = (reqBody) => {
  const data = reqBody;

  let dataSchema = {
    title: Joi.string().required(),
    duration: Joi.string().required(),
    album_id: Joi.number().integer().required(),
    created_at: Joi.date().default(moment()),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


const updateSongSchema = (reqBody) => {
  const data = reqBody;

  const dataSchema = {
    title: Joi.string(),
    duration: Joi.string(),
    album_id: Joi.number().integer(),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


module.exports = {
  createSongSchema,
  updateSongSchema
}