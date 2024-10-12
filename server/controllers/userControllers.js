import bcrypt from 'bcrypt'
import { User } from "../models/userModel.js";
import { generateToken } from '../utils/token.js';

export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password, mobile, profilePic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newUser = new User({ name, email, password: hashedPassword, mobile, profilePic });
        await newUser.save();

        const token = generateToken(newUser._id);

        res.cookie("token", token);

        res.json({ success: true, message: "user created successfully" });
    } catch (error) {
        console.log(error);
    res.status(error.statusCode || 500).json(error.message || 'Internal server error')        
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "user does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "user not autherized" });
        }

        const token = generateToken(userExist._id);

        res.cookie("token", token);
        res.json({ success: true, message: "user login successfull" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const userProfile = async (req, res, next) => {
    try {

        const {user}=req

        const userData = await User.findById(user.id).select('-password')

        res.json({ success: true, message: "user profile fetched", userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const userProfileUpdate = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user
        const { name, email, password } = req.body; // Get updated fields from request body
    
        const user = await User.findById(userId); // Find user by ID
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        // Update user fields (conditionally, only if provided)
        if (name) user.name = name;
        if (email) user.email = email;
    
        // If the password is being updated, hash the new password
        if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
        }
    
        // Save the updated user data
        await user.save();
    
        res.status(200).json({
          message: 'Profile updated successfully',
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
    };


export const userLogout = async (req, res, next) => {
    try {

        res.clearCookie('token')
        res.json({ success: true, message: "user logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const userDelete = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.clearCookie('token').status(200).json({message:"user deleted Sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const checkUser = async (req, res, next) => {
    try {

        res.json({ success: true, message: "autherized user" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};