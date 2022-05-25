const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController')

router.route('/')
    .get(employeeController.getAllEmployees)
    //post request to post new employees
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    //delete grabs the id from the json database
    .delete(employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);


module.exports = router;