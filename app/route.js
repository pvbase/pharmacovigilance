const express = require('express')
const OrganisationController = require("./controller/OrganisationController");
const RoleController = require("./controller/RoleController");
const UserController = require("./controller/userController");
const BranchController = require("./controller/BranchController");
const DepartmentController = require('./controller/DepartmentController');
const DesignationController = require('./controller/DesignationController');
const GroupController = require("./controller/GroupController");
const MappingController = require("./controller/MappingController");
const SettingController = require("./controller/SettingController");
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
router.put('/apidi/v1/user/:', UserController.updateUserDetails);
router.delete('/api/v1/user/:id', UserController.deleteUser);

//Branch Routes
router.post('/api/v1/branch', BranchController.createBranch);
router.get('/api/v1/branch/all',BranchController.showAllBranchDetails);
router.get('/api/v1/branch/:id', BranchController.getBranchDetails);
router.put('/api/v1/branch/:id', BranchController.updateBranchDetails);
router.delete('/api/v1/branch/:id', BranchController.deleteBranch);

//DepartmentModel
router.post('/api/v1/department', DepartmentController.createDepartment);
router.get('/api/v1/department/all',DepartmentController.showAllDepartmentDetails);
router.get('/api/v1/department/:id', DepartmentController.getDepartmentDetails);
router.put('/api/v1/department/:id', DepartmentController.updateDepartmentDetails);
router.delete('/api/v1/department/:id', DepartmentController.deleteDepartment);

//DesignationModel
router.post('/api/v1/designation', DesignationController.createDesignation);
router.get('/api/v1/designation/all',DesignationController.showAllDesignationDetails);
router.get('/api/v1/designation/:id', DesignationController.getDesignationDetails);
router.put('/api/v1/designation/:id', DesignationController.updateDesignationDetails);
router.delete('/api/v1/designation/:id', DesignationController.deleteDesignation);

//GroupModel
router.post('/api/v1/group', GroupController.createGroup);
router.get('/api/v1/group/all',GroupController.showAllGroupDetails);
router.get('/api/v1/group/:id', GroupController.getGroupDetails);
router.put('/api/v1/group/:id', GroupController.updateGroupDetails);
router.delete('/api/v1/group/:id', GroupController.deleteGroup);

//MappingModel
router.post('/api/v1/mapping', MappingController.createMapping);
router.get('/api/v1/mapping/all',MappingController.showAllMappingDetails);
router.get('/api/v1/mapping/:id', MappingController.getMappingDetails);
router.put('/api/v1/mapping/:id', MappingController.updateMappingDetails);
router.delete('/api/v1/mapping/:id', MappingController.deleteMapping);

//SettingModel

router.post('/api/v1/setting', SettingController.createSetting);
router.get('/api/v1/setting/all',SettingController.showAllSettingDetails);
router.get('/api/v1/setting/:id', SettingController.getSettingDetails);
router.put('/api/v1/setting/:id', SettingController.updateSettingDetails);
router.delete('/api/v1/setting/:id', SettingController.deleteSetting);

module.exports = router
