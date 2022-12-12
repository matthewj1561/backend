const express = require('express');
const router = express.Router();


router.use('/user', require('./user'));
router.use('/posts', require('./posts'))
router.use('/area', require('./area'))

module.exports = router;