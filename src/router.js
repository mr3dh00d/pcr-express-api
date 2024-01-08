const router = require('express').Router();

// auth
router.use('/auth', require('./controllers/users/index'));
router.use('/reviews', require('./controllers/reviews/index'));

module.exports = router;