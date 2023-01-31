var express = require('express');
const router = express.Router();
var paypalCont = require('../controller/paypal.cont');

router.get("/buy" , paypalCont.createPayment);
module.exports = router;