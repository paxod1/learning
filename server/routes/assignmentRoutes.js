import express from "express";
import { createAssignment, submitAssignment, evaluateAssignment, removeAssignment, getAllAssignments, getAssignmentById } from "../controllers/assignmentController.js";
import { authUser } from "../middlewares/authUser.js";
import { authMentor } from "../middlewares/authMentor.js";

const router = express.Router();

// Assignment Routes
router.post("/create", authMentor, createAssignment);        // Only mentors can create
router.post("/submit", authUser, submitAssignment);       // Only students can submit
router.put("/evaluate", authMentor, evaluateAssignment);     // Only mentors can evaluate
router.delete("/remove", authMentor, removeAssignment);      //Only mentors can remove
router.get("/all", getAllAssignments);
router.get("/:assignmentId", getAssignmentById);
 
export { router as assignmentRouter };
