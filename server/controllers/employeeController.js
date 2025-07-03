import Employee from '../models/Employee.js';


export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      position,
      department,
      joiningDate,
      task
    } = req.body;

    const profileUrl = "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740";

    const today = new Date();

    const newEmployee = new Employee({
      name,
      email,
      phoneNumber,
      position,
      department,
      joiningDate,
      profileUrl,
      task: task || '--',
      attendanceStatus: [{ date: today, status: 'Present' }]
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    await employee.deleteOne();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};


export const markTodayAttendance = async (req, res) => {
  const attendanceMap = req.body; // { employeeId: "Present" | "Absent" }
  const today = new Date().toISOString().split('T')[0];

  try {
    const employeeIds = Object.keys(attendanceMap);

    for (const id of employeeIds) {
      const status = attendanceMap[id];

      const employee = await Employee.findById(id);
      if (!employee) continue;

      // Check if today's attendance exists
      const existingEntryIndex = employee.attendanceStatus.findIndex(entry => {
        const entryDate = new Date(entry.date).toISOString().split('T')[0];
        return entryDate === today;
      });

      if (existingEntryIndex !== -1) {
        // ✅ Update existing entry
        employee.attendanceStatus[existingEntryIndex].status = status;
      } else {
        // ➕ Add new entry
        employee.attendanceStatus.push({
          date: new Date(),
          status
        });
      }

      await employee.save();
    }

    return res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error('Error in markTodayAttendance:', err);
    return res.status(500).json({ message: 'Error marking attendance', error: err.message });
  }
};


