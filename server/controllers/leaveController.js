import Leave from '../models/Leaves.js';
import Employee from '../models/Employee.js';

export const createLeave = async (req, res) => {
  try {
    const { employeeId, date, reason, documentUrl } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const latestStatus = employee.attendanceStatus.at(-1)?.status;
    if (latestStatus !== 'Present') {
      return res.status(400).json({ message: 'Only Present employees can apply for leave' });
    }

    const leave = new Leave({ employee: employeeId, date, reason, documentUrl });
    await leave.save();
    res.status(201).json({ message: 'Leave applied successfully', leave });
  } catch (err) {
    res.status(500).json({ message: 'Error creating leave', error: err.message });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employee');
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaves', error: err.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findById(id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = status;
    await leave.save();

    res.status(200).json({ message: 'Leave status updated', leave });
  } catch (err) {
    res.status(500).json({ message: 'Error updating leave', error: err.message });
  }
};
