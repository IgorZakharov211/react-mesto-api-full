const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const {
  invalidId,
  minAbout,
  maxAbout,
  requiredAbout,
  minName,
  maxName,
  requiredName,
  invalidLink,
  invalidLength,
  invalidHex,
  requiredEmail,
  emptyEmail,
  requiredPassword,
  emptyPassword,
} = require('../constants');

const validateObjectId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message(invalidId);
    }),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': minAbout,
        'string.max': maxAbout,
        'any.required': requiredAbout,
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': minName,
        'string.max': maxName,
        'any.required': requiredName,
      }),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(invalidLink);
    }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(invalidLink);
    }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex()
      .messages({
        'string.length': invalidLength,
        'string.hex': invalidHex,
      }),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': requiredEmail,
        'string.emoty': emptyEmail,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': requiredPassword,
        'string.empty': emptyPassword,
      }),
  }),
});

module.exports = {
  validateObjectId,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCardBody,
  validateCardId,
  validateAuth,
};
