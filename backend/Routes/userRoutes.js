const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    logOutUser,
    refresh
} = require ('../Controller/userController');

router.route('/register-user').post(createUser);
router.route('/login-user').post(loginUser);
router.route('/logout-user').post(logOutUser);
router.route('/refresh').post(refresh);




module.exports = router;