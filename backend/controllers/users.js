const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-error');
const ValidationError = require('../errors/validation-error');

const { NODE_ENV, JWT_SECRET } = process.env;

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
        throw new NotFoundError('Нет пользователя с таким id');
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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new ValidationError('Неправильно указан Email!');
      }
      return res.send({
        id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((e) => {
      if (e.code === 11000) {
        const err = new Error('Пользователь с таким Email уже существует');
        err.statusCode = 409;
        next(err);
      } else {
        const err = new AuthError('Неправильно указан Email');
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
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
        throw new NotFoundError('Нет пользователя с таким id');
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
      if (!user) {
        throw new AuthError('Возникли проблемы с авторизацией');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      const err = new AuthError('Неправильный Email или пароль');
      next(err);
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getUser,
};
