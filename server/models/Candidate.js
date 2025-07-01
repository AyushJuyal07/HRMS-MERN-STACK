import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    position: { type: String, required: true },
    experience: { type: Number, required: true },
    resumeUrl: { type: String, required: true }, 
    status: {
    type: String,
    enum: ['New', 'Scheduled', 'Ongoing', 'Selected', 'Rejected'],
    default: 'New'
  }
  },
  { timestamps: true }
);

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
