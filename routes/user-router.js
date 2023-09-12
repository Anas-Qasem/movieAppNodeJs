const UserCtrl = require('../controller/user-controller');
const express = require('express');

const router = express.Router();

router.post('/signUp',UserCtrl.signUp);

module.exports = router;