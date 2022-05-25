const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};

data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    //post request to post new employees
    .post((req, res) => {
        res.json({
            "name": req.body.name,
            "hobby": req.body.hobby
        });
    })
    .put((req, res) => {
        res.json({
            "name": req.body.name,
            "hobby": req.body.hobby
        });
    })
    //delete grabs the id from the json database
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });


module.exports = router;