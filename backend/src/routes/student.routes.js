import express from "express";
import verifyToken from "../middleware/auth.middleware.js";
import { isAdmin, isStudent } from "../middleware/role.middleware.js";
import {
  getAllStudents,
  getMyProfile,
  updateMyProfile,
  deleteStudent,
  addStudent,
  updateStudent
} from "../controllers/student.controller.js";

const router = express.Router();
router.get("/me", verifyToken, isStudent, getMyProfile);
router.put("/me", verifyToken, isStudent, updateMyProfile);

router.get("/", verifyToken, isAdmin, getAllStudents);
router.post("/", verifyToken, isAdmin, addStudent);
router.put("/:id", verifyToken, isAdmin, updateStudent);
router.delete("/:id", verifyToken, isAdmin, deleteStudent);

export default router;
