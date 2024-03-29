const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-error');
const { incorrectCardId, cantDeleteCard } = require('../constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.countDocuments()
    .then((count) => {
      Card.create({ id: count, owner: req.user._id, ...req.body })
        .then((card) => {
          res.send(card);
        })
        .catch(next);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError(incorrectCardId);
      }
      /* eslint-disable eqeqeq */
      if (req.user._id == result.owner) {
      /* eslint-enable eqeqeq */
        Card.findByIdAndRemove(req.params._id)
          .then((card) => {
            res.send(card);
          })
          .catch(next);
      } else {
        throw new AuthError(cantDeleteCard);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(incorrectCardId);
      }
      return res.send({ data: card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(incorrectCardId);
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
