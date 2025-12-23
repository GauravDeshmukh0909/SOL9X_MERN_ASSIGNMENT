import Student from "../models/student.model.js";
import User from "../models/user.model.js"; 
import bcrypt from "bcryptjs"; 

// ADMIN: Get all students
export const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit;

    const totalStudents = await Student.countDocuments();

    const students = await Student.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      students,
      pagination: {
        totalStudents,
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: page,
        limit,
      },
    });
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

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Student already exists" });
    }

    //  Default password
    const defaultPassword = "student@123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    
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