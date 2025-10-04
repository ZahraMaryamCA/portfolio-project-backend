const Contact = require('../models/contact.model');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single contact by ID
// @route   GET /api/contacts/:id
// @access  Public
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    // Validation
    if (!firstname || !lastname || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const contact = await Contact.create({
      firstname,
      lastname,
      email,
    });

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Update contact by ID
// @route   PUT /api/contacts/:id
// @access  Public
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Delete contact by ID
// @route   DELETE /api/contacts/:id
// @access  Public
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Delete all contacts
// @route   DELETE /api/contacts
// @access  Public
exports.deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} contacts deleted successfully`,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};