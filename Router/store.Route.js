const express = require('express');
const router = express.Router();
const storeCount = require('../controller/store.cont');

router.get('/stores',storeCount.getStoreList);
router.post('/store/create',storeCount.createStore);



module.exports =router;