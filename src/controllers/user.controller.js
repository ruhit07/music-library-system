const bcrypt = require('bcryptjs');
const ErrorResponse = require("../utils/error-response.utils");
const asyncHandler = require("../middlewares/async.middleware");
const { knex } = require('../config/db');

const { createUserSchema, updateUserSchema } = require("../validation/user.validation");

// @desc      Get List of all users
// @route     GET /api/users
// @access    Private
exports.getUsers = asyncHandler(async (req, res, next) => {

  const { rows: users } = await knex.raw('select id, name, username, created_at from users');

  return res.status(200).json({
    success: true,
    message: `List of all users`,
    count: users.length,
    data: users,
  });
});

// @desc      Get single user
// @route     GET /api/users/:id
// @access    Private
exports.getUser = asyncHandler(async (req, res, next) => {

  const { rows: [user] } = await knex.raw('select * from users where id = ?', [req.params.id]);
  if (!user) {
    return next(new ErrorResponse(`No User with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: `User of id ${req.params.id}`,
    data: user,
  });
});

// @desc      Create User
// @route     POST /api/users
// @access    Private
exports.addUser = asyncHandler(async (req, res, next) => {

  const reqBody = await createUserSchema(req.body);
  const { name, username, password, created_at } = reqBody;

  const { rows: [existUser] } = await knex.raw(
    `
      select id, name, username, created_at 
      from users 
      where username = ?
    `,  [username]);
    
  if (existUser) {
    return next(new ErrorResponse(`Username already exists`, 400));
  };

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const { rows: [user] } = await knex.raw(
    `insert into users (name, username, password, created_at) values (?, ?, ?, ?) returning *`,
    [name, username, hashPassword, created_at]
  );

  delete user.password

  res.status(201).json({
    success: true,
    message: `User created successfully`,
    data: user,
  });
});

// @desc      Update User
// @route     PUT /api/users/:id
// @access    Private
exports.updateUser = asyncHandler(async (req, res, next) => {

  const { rows: [user] } = await knex.raw('select * from users where id = ?', [req.params.id]);
  if (!user) {
    return next(new ErrorResponse(`No User with the id of ${req.params.id}`, 404));
  }

  const reqBody = await updateUserSchema(req.body);

  if (reqBody.username) {
    const { rows: [existUser] } = await knex.raw(
      'select * from users where username = ? AND id != ?',
      [reqBody.username, req.params.id]
    );

    if (existUser) {
      return next(new ErrorResponse(`Username already exists`, 400));
    }
  }

  const updateValue = {};
  if (reqBody.name) updateValue.name = reqBody.name;
  if (reqBody.username) updateValue.username = reqBody.username;

  const columns = Object
    .keys(updateValue)
    .map(column => `${column} = :${column}`)
    .join(', ');

  const { rows: [newUser] } = await knex.raw(
    `update users SET ${columns} where id = :id returning *`,
    { ...updateValue, id: req.params.id }
  );

  delete newUser.password
  
  res.status(200).json({
    success: true,
    message: `User with the id ${req.params.id} updated successfully`,
    data: newUser,
  });
});

// @desc      Delete User
// @route     delete /api/users/:id
// @access    Private
exports.deleteUser = asyncHandler(async (req, res, next) => {

  const { rows: [user] } = await knex.raw('select * from users where id = ?', [req.params.id]);
  if (!user) {
    return next(new ErrorResponse(`No user with the id of ${req.params.id}`, 404));
  }

  await knex.raw('delete from users where id = ?', [req.params.id]);

  res.status(200).json({
    success: true,
    message: `User with the id ${req.params.id} deleted successfully`,
    data: {},
  });
});

