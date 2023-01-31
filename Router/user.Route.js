const express = require('express');
const router = express.Router();
const UserCount = require('../controller/user.cont');




router.get('/all',UserCount.getUserList);
// router.get('/Details/:bookId',BookCount.getBookDetails);
router.post('/create',UserCount.createUser);
// router.put('/update/:bookId',BookCount.updateBook);
// router.delete('/delete/:bookId',BookCount.deleteBook);






module.exports =router;