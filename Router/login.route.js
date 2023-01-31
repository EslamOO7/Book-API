const express = require('express');
const router = express.Router();
const loginCount = require('../controller/login.cont');
const jwt = require('../util/JWT');




router.post('/signin', loginCount.signIn);
router.get('/profile/:userId', jwt.verifyToken(['user']), loginCount.getUserProfile);







module.exports = router;