
const Knex = require('knex');
const config = require('./config');

const knex = Knex({
  client: 'pg',
  connection: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
  },
  pool: { 
    min: 0, 
    max: 200 
  },
  useNullAsDefault: true
});


const connectPostgreSQL = async () => {
  try {
    await knex.raw('SELECT 1');  // To test the connection
    console.log(`PostgreSQL Database connected...`.yellow.bold);
  } catch (err) {
    console.log(`ERROR: ${err}`.red.bold);
  }
};

module.exports = {
  knex,
  Knex,
  connectPostgreSQL
};