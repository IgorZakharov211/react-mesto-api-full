const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { validateAuth } = require('../middlewares/validations');

const { createUser, login } = require('../controllers/users');

router.post('/signup', validateAuth, createUser);
router.post('/signin', validateAuth, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
