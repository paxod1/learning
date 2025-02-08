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

export const adminLogin = async (req, res, next) => {
    try {
        console.log('admin login route');

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const userExist = await Admin.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "user does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "user not autherized" });
        }

        console.log('before token gen');

        const token = generateToken(userExist._id, "admin");
        console.log(token,'after token gen');

        // console.log("token is............", token);

        res.cookie("token", token);
        res.json({ success: true, message: "user login successfull" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
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