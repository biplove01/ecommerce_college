import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    if (!req.body) {
        return res.json({ success: false, message: "No data received" });
    }
    
    const { email, password } = req.body;
    
    try {
        // Input validation
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create token and send response
        const token = createToken(user._id);
        res.json({ 
            success: true, 
            message: "Login successful", 
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ success: false, message: "Error in user login" });
    }
}

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not found in environment variables");
        throw new Error("JWT_SECRET not configured");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}


//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Input validation
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }
        //checking if user already exists
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success: false, message: "User already exists"});
        }
        //validating email an password
        if (!validator.isEmail(email)){
            return res.json({success: false, message: "Invalid Email"});
        }
        if (!validator.isLength(password, { min: 8 })) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name, 
            email:email, 
            password:hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        
        res.status(201).json({
            success: true, 
            message: "User registered successfully", 
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ success: false, message: "Error in registering user" });
    }
}

export { loginUser, registerUser };