const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    logOutUser,
    refresh,
    fetchUsers,
    deleteUser,
    updateUser
} = require ('../Controller/userController');

router.route('/register-user').post(createUser);
router.route('/login-user').post(loginUser);
router.route('/logout-user').post(logOutUser);
router.route('/refresh').post(refresh);
router.route('/fetch-users').get(fetchUsers);
router.route('/remove-user').delete(deleteUser);
router.route('/update-user').put(updateUser);




module.exports = router;