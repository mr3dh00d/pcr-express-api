const router = require('express').Router();

// auth
router.use('/auth', require('./controllers/users/index'));

module.exports = router;