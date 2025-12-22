import Student from "../models/student.model.js";
import User from "../models/user.model.js"; // ✅ ADD THIS
import bcrypt from "bcryptjs"; // ✅ ADD THIS (or "bcrypt" depending on your package)

// ADMIN: Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: Get own profile
export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: Update own profile
export const updateMyProfile = async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Update any student
export const updateStudent = async (req, res) => {
  try {
    const { name, email, course, enrollmentDate } = req.body;

    // 1️⃣ Update Student profile
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        course,
        enrollmentDate
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2️⃣ Sync email & name in User collection
    await User.findByIdAndUpdate(student.userId, {
      name,
      email
    });

    res.json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Delete student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete both Student and User records
    await Student.findByIdAndDelete(req.params.id);
    await User.findByIdAndDelete(student.userId);
    
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Add Student
export const addStudent = async (req, res) => {
  try {
    const { name, email, course, enrollmentDate } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // 2️⃣ Default password
    const defaultPassword = "student@123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // 3️⃣ Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    // 4️⃣ Create Student Profile
    const student = await Student.create({
      userId: user._id,
      name,
      email,
      course,
      enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : new Date()
    });

    res.status(201).json({
      message: "Student added successfully",
      credentials: {
        email,
        password: defaultPassword
      },
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}