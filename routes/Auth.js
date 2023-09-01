const express = require('express');
const { registerController, loginController, currentControllerUser } = require('../controllers/AuthController');
const AuthMiddlewares = require('../middlewares/AuthMiddlewares');
const router = express.Router();


router.post('/register', registerController);
router.post('/login', loginController);
router.get('/current-user', AuthMiddlewares, currentControllerUser);

module.exports = router