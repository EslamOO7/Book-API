const express = require('express');
const router = express.Router();
const BookCount = require('../controller/Book.cont');




router.get('/all',BookCount.getBookList);
router.get('/Details/:bookId',BookCount.getBookDetails);
router.post('/add',BookCount.addBook);
router.put('/update/:bookId',BookCount.updateBook);
router.delete('/delete/:bookId',BookCount.deleteBook);






module.exports =router;