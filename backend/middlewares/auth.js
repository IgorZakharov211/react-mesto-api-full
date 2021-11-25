const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { authRequired } = require('../constants');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(authRequired);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    throw new AuthError(authRequired);
  }

  req.user = payload;

  next();
};
