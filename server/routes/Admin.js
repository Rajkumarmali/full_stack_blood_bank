const express = require('express');
const AuthMiddlewares = require('../middlewares/AuthMiddlewares');
const { getDonerListController, getHospitalListController, getOrgListController, deletDataController } = require('../controllers/AdminController');
const AdminMiddleware = require('../middlewares/AdminMiddleware');
const router = express.Router();

router.get('/doner-list', AuthMiddlewares, AdminMiddleware, getDonerListController);
router.get('/hospital-list', AuthMiddlewares, AdminMiddleware, getHospitalListController);
router.get('/org-list', AuthMiddlewares, AdminMiddleware, getOrgListController);
router.delete('/delet-doner/:id', AuthMiddlewares, AdminMiddleware, deletDataController)

module.exports = router;