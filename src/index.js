const app = require('./app');
require('colors');
const config = require('./config/config');
const { connectPostgreSQL } = require('./config/db');

// Connect to database
connectPostgreSQL();

// Listening on port
const PORT = config.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`.cyan.bold)
);

// Close server & exit process
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (err) => {
  console.log(`Error: ${err.message}`.red);
  exitHandler();
};

// Handle unhandled promise rejections
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log(`SIGTERM received`.red);

  if (server) {
    server.close();
  }
});
