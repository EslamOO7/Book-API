var express = require('express');
const router = express.Router();
var uploadCont  = require('../controller/Upload.cont');

router.post("/upload/file" , uploadCont.uploadFile);
module.exports = router;