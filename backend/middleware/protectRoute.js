import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(400).json({ success: false, error: "Unauthorized Access: No token provided. Please log in to access this resource." })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
        return res.status(400).json({ success: false, error: "Unauthorized token: invalid token." })
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
        return res.status(400).json({ success: false, error: "user not found" })
    }

    req.user = user

    next();
}

export default protectRoute