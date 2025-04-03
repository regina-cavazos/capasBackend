const express = require('express');

const router = express.Router();
const CustomerHttpHandler = require('../handlers/students');
const CustomerServiceFactory = require('../db/factory');
const CustomerController = require('../controllers/customer');

// Create the service and controller
const customerService = CustomerServiceFactory.create('fake');
const customerController = new CustomerController(customerService);

// Create the handler instance
const customerHandler = new CustomerHttpHandler(customerController);

// Set up routes with bound handler methods
router.get('/', customerHandler.getAllCustomers.bind(customerHandler));
router.get('/:id', customerHandler.getCustomerById.bind(customerHandler));
router.post('/', customerHandler.createCustomer.bind(customerHandler));
router.put('/:id', customerHandler.updateCustomer.bind(customerHandler));
router.delete('/:id', customerHandler.deleteCustomer.bind(customerHandler));

module.exports = router;
