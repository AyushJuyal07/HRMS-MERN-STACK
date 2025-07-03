import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    // default: Date.now
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Present'
  }
});

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  joiningDate: { type: String, required: true },
  profileUrl: { type: String },
  task: { type: String },
  attendanceStatus: [attendanceSchema]
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
