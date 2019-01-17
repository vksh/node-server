const express = require('express');
const router = express.Router();
const jwtHelper = require('../utilities/jwt-helper');

const user_controller = require('../controllers/user-info.controller');
router.post('/authenticate', user_controller.user_authenticate);
router.get('/userDetails', jwtHelper.verifyJwtToken, user_controller.get_user_details);
module.exports = router;