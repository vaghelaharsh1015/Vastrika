import Contact from '../models/Contact.js';

// @desc    Submit a new contact / customer inquiry
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Subject, Message)',
      });
    }

    const inquiry = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Vastrika! Our royal concierge team will respond shortly.',
      data: inquiry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit inquiry',
    });
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contact
// @access  Private/Admin
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Contact.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry record not found',
      });
    }

    inquiry.status = status || inquiry.status;
    const updated = await inquiry.save();

    res.json({
      success: true,
      message: 'Inquiry status updated',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
