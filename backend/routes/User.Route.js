import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { GetUser } from "../controllers/getUser.controller.js";

export const UserRoute = express.Router()

UserRoute.get('/',protectRoute,GetUser)