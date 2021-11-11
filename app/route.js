const express = require('express')
const OrganisationController = require("../app/controller/OrganisationController");
const RoleController = require("./controller/RoleController");
const UserController = require("./controller/userController");
router = express.Router()

//Organization Routes
router.post('/api/v1/organisation', OrganisationController.createOrganisation);
router.get('/api/v1/organisation/all', OrganisationController.showAllOrganisationDetails);
router.get('/api/v1/organisation/:id', OrganisationController.getOrganisationDetails);
router.put('/api/v1/organisation/:id', OrganisationController.updateOrganisationDetails);
router.delete('/api/v1/organisation/:id', OrganisationController.deleteOrganisation);

//Role Routes
router.post('/api/v1/role', RoleController.createRole);
router.get('/api/v1/role/all', RoleController.showAllRoleDetails);
router.get('/api/v1/role/:id', RoleController.getRoleDetails);
router.put('/api/v1/role/:id', RoleController.updateRoleDetails);
router.delete('/api/v1/role/:id', RoleController.deleteRole);

//User Routes
router.post('/api/v1/user', UserController.register);
router.post('/api/v1/user/login', UserController.login);
router.get('/api/v1/user/all', UserController.getAllUserDetails);
router.get('/api/v1/user/userCounts', UserController.userCounts);
router.get('/api/v1/user/:id', UserController.getUserDetails);
router.put('/api/v1/user/:id', UserController.updateUserDetails);
router.delete('/api/v1/user/:id', UserController.deleteUser);





module.exports = router
