// routes - students.js
const express = require('express');

const router = express.Router();
const DBFactory = require('../db/factory');
const StudentController = require('../controllers/students');
const StudentHttpHandler = require('../handlers/students');

// Create the service and controller
const studentService = DBFactory.create('fake');
const studentController = new StudentController(studentService);

// Create the handler instance
const studentHandler = new StudentHttpHandler(studentController);

// Set up routes with bound handler methods
router.get('/', studentHandler.getAllStudents.bind(studentHandler));

module.exports = router;