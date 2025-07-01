import Candidate from '../models/Candidate.js';

export const createCandidate = async (req, res) => {
  try {
    const { name, email, phoneNumber, position, experience } = req.body;
    const resumeUrl = req.file.path;

    const candidate = await Candidate.create({
      name,
      email,
      phoneNumber,
      position,
      experience,
      resumeUrl,
    });

    res.status(201).json({ message: 'Candidate created', candidate });
  } catch (err) {
    res.status(500).json({ message: 'Error creating candidate', error: err.message });
  }
};


export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    if (candidate.resumeUrl && fs.existsSync(candidate.resumeUrl)) {
      fs.unlinkSync(candidate.resumeUrl);
    }

    await candidate.deleteOne();
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting candidate' });
  }
};