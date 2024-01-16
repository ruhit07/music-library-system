const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const { env_mode } = require('../enums/common.enum');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const configEnvSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid(env_mode.PRODUCTION, env_mode.DEVELOPMENT).required(),
    PORT: Joi.number().default(3900).required(),

    DB_HOST: Joi.string().description('Database host'),
    DB_PORT: Joi.number().description('Database port'),
    DB_USERNAME: Joi.string().description('Database username'),
    DB_PASSWORD: Joi.string().description('Database password'),
    DB_NAME: Joi.string().required().description('Database name'),

    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_EXPIRES: Joi.string().default('7d').required().description('days after which jwt expire'),
    COOKIE_EXPIRES: Joi.number().default(7).required().description('days after which cookie expire'),
  })
  .unknown();

const { value: configEnv, error } = configEnvSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// console.log("Config ENV", configEnv);

module.exports = configEnv || {};
