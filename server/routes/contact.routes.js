const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Route: /api/contacts
router
  .route('/')
  .get(contactController.getAllContacts)      // GET all contacts
  .post(contactController.createContact)       // POST new contact
  .delete(contactController.deleteAllContacts); // DELETE all contacts

// Route: /api/contacts/:id
router
  .route('/:id')
  .get(contactController.getContactById)    // GET contact by ID
  .put(contactController.updateContact)      // PUT update contact
  .delete(contactController.deleteContact);  // DELETE contact by ID

module.exports = router;