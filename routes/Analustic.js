const express = require('express');
const AuthMiddlewares = require('../middlewares/AuthMiddlewares');
const { bloodGroupDetailController } = require('../controllers/Analustic');
const router = express.Router();

router.get('/bloodGroup-data', AuthMiddlewares, bloodGroupDetailController);

module.exports = router;