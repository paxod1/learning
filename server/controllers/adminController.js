import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js';
import { Admin } from '../models/adminModel.js';


export const createAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
        if (existingAdmin) {
            console.log('Admin already exists');

            return;
        }

        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        const admin = new Admin({
            name: 'SuperAdmin',
            email: 'admin@example.com',
            password: hashedPassword,
            profilePic: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        });



        await admin.save();
        console.log('Admin user created successfully!');
    } catch (error) {
        console.error('Error creating admin:', error);
    }
};

import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";  // Ensure correct import
import generateToken from "../utils/generateToken.js";  // Ensure correct import

export const adminLogin = async (req, res, next) => {
    try {
        console.log("🔹 Admin login attempt...");

        const { email, password } = req.body;

        // ✅ Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Find the admin user
        const userExist = await Admin.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // ✅ Compare password asynchronously
        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        console.log("🔹 Before token generation...");

        // ✅ Generate JWT token
        const token = generateToken(userExist._id, "admin");
        console.log("✅ Token generated:", token);

        // ✅ Set secure HTTP-only cookie
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: true, 
            sameSite: "None" 
        });

        // ✅ Send response with user details
        res.status(200).json({
            success: true,
            message: "User login successful",
            user: {
                id: userExist._id,
                email: userExist.email,
                role: "admin"
            },
            token
        });

    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(error.statusCode || 500).json({ 
            success: false, 
            message: error.message || "Internal server error" 
        });
    }
};



export const adminProfile = async (req, res, next) => {
    try {

        const { user } = req

        const userData = await Admin.findById(user.id).select('-password')

        res.json({ success: true, message: "user profile fetched", userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const adminLogout = async (req, res, next) => {
    try {

        res.clearCookie('token')
        res.json({ success: true, message: "user logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const checkAdmin = async (req, res, next) => {
    try {

        res.json({ success: true, message: "autherized user" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};