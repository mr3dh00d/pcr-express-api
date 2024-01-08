const { Router } = require('express');
const authMiddleware = require('../../middlewares/authMiddelware');

const router = Router();

//
router.use('/', require('./read'));

router.use(authMiddleware);
router.use('/create', require('./create'));

module.exports = router;