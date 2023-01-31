var express = require('express');
const router = express.Router();
var exportCont = require('../controller/export.cont');

router.get("/export/books" , exportCont.exportBooks);
module.exports = router;