const router = require('express').Router();
const {
  getProfile, updateProfile, updateAvatar, getUser,
} = require('../controllers/users');
const { validateObjectId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validations');

router.get('/me', getUser);
router.get('/:_id', validateObjectId, getProfile);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
