const express = require('express');
const AuthMiddlewares = require('../middlewares/AuthMiddlewares');
const { creatInvantory, getInvantoryController, getDonarController, getHospitalController, getOrganizationController, getOrganizationForHospitalController, getInvantoryHospitalController } = require('../controllers/invantoryContaroller');
const router = express.Router();

router.post('/creat-invantory', AuthMiddlewares, creatInvantory)
router.post('/get-invantory-hospital', AuthMiddlewares, getInvantoryHospitalController)
router.get('/get-invantory', AuthMiddlewares, getInvantoryController)
router.get('/get-doner', AuthMiddlewares, getDonarController)
router.get('/get-hospital', AuthMiddlewares, getHospitalController)
router.get('/get-organization', AuthMiddlewares, getOrganizationController)
router.get('/get-organization-for-hospital', AuthMiddlewares, getOrganizationForHospitalController)

module.exports = router;