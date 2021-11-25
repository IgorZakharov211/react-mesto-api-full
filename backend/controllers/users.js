const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const { conflictEmail, incorrectUserId } = require('../constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const _id = req.user;
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(incorrectUserId);
      }
      return res.send(user);
    })
    .catch(next);
};

const getProfile = (req, res, next) => {
  const _id = req.params;
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(incorrectUserId);
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash,
    })
      .then((user) => res.send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(conflictEmail));
        }
        if (err.name === 'ValidationError') {
          next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
        } else {
          next(err);
        }
      }));
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(incorrectUserId);
      } else {
        return res.send({ data: user });
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(incorrectUserId);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getUser,
};
