import { Assignment } from "../models/assignmentModel.js";

// Create Assignment
export const createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
       
         // Check if an assignment with the same title already exists
         const existingAssignment = await Assignment.findOne({ title });
         if (existingAssignment) {
             return res.status(409).json({ message: "Assignment already exists" });
         }
 
        const assignment = await Assignment.create({
            title,
            description,
            dueDate,
            createdBy: req.user.id
        });
        res.status(201).json({ message: "Assignment created", assignment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Submit Assignment
export const submitAssignment = async (req, res) => {
    try {
        const { assignmentId, content } = req.body;

        if (!content.trim()) {
            return res.status(400).json({ message: "Assignment is not finished!" });
        }

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        // Check if the student has already submitted
        const existingSubmission = assignment.submissions.find(sub => sub.studentId.toString() === req.user.id);
        if (existingSubmission) {
            return res.status(409).json({ message: "You have already submitted this assignment" });
        }

        assignment.submissions.push({
            studentId: req.user.id,
            content,
            submittedAt: new Date()
        });

        await assignment.save();
        res.status(200).json({ message: "Assignment submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Get Assignment by ID (for viewing before submission)
export const getAssignmentById = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        console.log("Received assignmentId:", assignmentId);  
       // const assignment = await Assignment.findById(assignmentId);
         const  assignment = await Assignment.findOne({ _id: assignmentId }); 

        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Get All Assignments (without submissions)
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({}, "-submissions"); // Exclude submissions

        if (!assignments.length) {
            return res.status(200).json([]); // Return empty array if no assignments
        }

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Evaluate Assignment
export const evaluateAssignment = async (req, res) => {
    try {
        const { assignmentId, studentId, score, feedback } = req.body;
        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        const submission = assignment.submissions.find(sub => sub.studentId.toString() === studentId);
        if (!submission) return res.status(404).json({ message: "Submission not found" });

        submission.score = score;
        submission.feedback = feedback;
        await assignment.save();

        res.status(200).json({ message: "Assignment evaluated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Remove assignment
export const removeAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.body;  // Retrieve assignmentId from the request body

        if (!assignmentId) {
            return res.status(400).json({ message: "Assignment not found" });
        }

        const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
        
        if (!deletedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.status(200).json({ message: "Assignment removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};


