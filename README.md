# Music Library System backend development with Node.js

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/ruhit07/music-library-system.git
cd music-library-system
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Features

- **SQL database**: [PostgreSQL](https://www.postgresql.org) sql query builder using [Knex](https://knexjs.org)
- **Authentication**: using [jsonwebtoken](https://jwt.io)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [Npm](https://docs.npmjs.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io) and HTTP parameter pollution attacks using [hpp](https://github.com/analog-nico/hpp)
- **CORS**: cross-origin resource-sharing enabled using [cors](https://github.com/expressjs/cors)

## Commands

Running locally:

```bash
npm run dev
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
NODE_ENV=example
PORT=3900

# Database Settings
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=101
DB_NAME=music_library_system

# JWT Settings
JWT_SECRET=unsecureJwtSecret
JWT_EXPIRES=1d
COOKIE_EXPIRES=1
```

## Project Structure
```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Controller layer
 |--enums\          # Common enums
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3900/api/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/auth/register` - register\
`POST /api/auth/login` - login\
`DELETE /api/auth/logout` - logout

**User routes**:\
`GET /api/users` - get all users\
`GET /api/users/:id` - get user\
`POST /api/users` - create a user\
`PUT /api/users/:id` - update user\
`DELETE /api/users/:id` - delete user

**Artist routes**:\
`GET /api/artists` - get all artists\
`GET /api/artists/:id` - get artist\
`POST /api/artists` - create a artist\
`PUT /api/artists/:id` - update artist\
`DELETE /api/artists/:id` - delete artist

**Album routes**:\
`GET /api/albums` - get all albums\
`GET /api/albums/:id` - get album\
`POST /api/albums` - create a album\
`PUT /api/albums/:id` - update album\
`DELETE /api/albums/:id` - delete album

**Song routes**:\
`GET /api/songs` - get all songs\
`GET /api/songs/:id` - get song\
`POST /api/songs` - create a song\
`PUT /api/songs/:id` - update song\
`DELETE /api/songs/:id` - delete song
