import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import GenerateTokenAndSetCookies from "../utils/GenerateToken.js";



export const Signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password not matched !" })
        }

        const user = await User.findOne({ username: username.toLowerCase() });
        if (user) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt)

        //profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username: username.toLowerCase(),
            password: hashpassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {

            GenerateTokenAndSetCookies(newUser._id, res)

            await newUser.save();

            return res.status(201).json({
                success: true,
                message: "Registration successfully",
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }



    } catch (error) {
        console.log("error in signup route ", error.message);
        return res.status(500).json({ success: false, message: "internal server Error" })
    }
}

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordMatched = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "invalid username and passsword"
            })
        }

        GenerateTokenAndSetCookies(user._id, res);

        return res.status(200).json({
            success:true,
            message: "Login success",
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            gender: user.gender,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller ", error.message);
        return res.status(500).json({ success: false, error: "internal server Error" })
    }
}

export const Logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ success: true, message: "Logout Successfully" })
    } catch (error) {
        console.log("Error in logout controller ", error.message);
        return res.status(500).json({ success: false, error: "internal server Error" })
    }
}