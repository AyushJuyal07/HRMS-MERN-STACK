import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  joiningDate: { type: String, required: true },
  profileUrl: { type: String }, // Optional: profile picture
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
