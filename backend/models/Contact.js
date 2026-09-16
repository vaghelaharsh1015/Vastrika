import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please write your message'],
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Resolved', 'Archived'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
