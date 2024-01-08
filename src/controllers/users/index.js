const { Router } = require('express');

const router = Router();

//
router.use('/signin', require('./signin'));
router.use('/login', require('./login'));

module.exports = router;