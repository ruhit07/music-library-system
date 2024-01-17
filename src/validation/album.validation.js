
const Joi = require('joi');
const moment = require('moment');
const ErrorResponse = require('../utils/error-response.utils');

const createAlbumSchema = (reqBody) => {
  const data = reqBody;

  let dataSchema = {
    title: Joi.string().required(),
    release_year: Joi.number().integer().min(1000).max(9999).required(),
    genre: Joi.string().required(),
    artist_ids: Joi.array().items(Joi.number().integer()).required(),
    created_at: Joi.date().default(moment()),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


const updateAlbumSchema = (reqBody) => {
  const data = reqBody;

  const dataSchema = {
    title: Joi.string(),
    release_year: Joi.number().integer().min(1000).max(9999),
    genre: Joi.string(),
    artist_ids: Joi.array().items(Joi.number().integer()),
  };

  return new Promise((resolve, reject) => {
    const { value, error } = Joi.object(dataSchema).validate(data, { abortEarly: false });
    if (error) reject(new ErrorResponse(error, 400, { name: "JoiValidationError", error }));
    resolve(value);
  })
};


module.exports = {
  createAlbumSchema,
  updateAlbumSchema
}