import User from "../models/user.model.js";


export const GetUser = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;

        const filterUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        return res.status(200).json({success:true,filterUser})
    } catch (error) {
        console.log("Error in getUser for sidebar Route", error.message)
        return res.status(500).json({ error: "internal server Error" })
    }
}