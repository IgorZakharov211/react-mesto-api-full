const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateObjectId, validateCardBody, validateCardId } = require('../middlewares/validations');

router.get('', getCards);
router.post('', validateCardBody, createCard);
router.delete('/:_id', validateObjectId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
