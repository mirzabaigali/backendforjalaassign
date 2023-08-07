const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController');

router.route("/products").get(userController.getAllProducts);
router.route("/testing").get(userController.getAllProductsTesting);
router.route("/login").post(userController.login);
router.route("/register").post(userController.register)
router.route("/createemployee").post(userController.createEmployee)
router.route("/getallemployees").get(userController.getAllEmployees)
router.route("/deleteemployees/:id").delete(userController.deleteEmployee)
router.route("/editemployees/:id").put(userController.editEmployee)
router.route("/getemployeesbyid/:id").get(userController.getEmployeeById)


module.exports=router;