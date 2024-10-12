import e from "express";
const router = e.Router();
import { userLogin, userProfile,userLogout, userSignup } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";

router.post("/sign-up", userSignup);

router.post("/log-in", userLogin);

router.get("/profile", authUser , userProfile);

//router.put("/profile-update", (req,res,next) =>{});

//router.delete("/profile-delete", (req, res, next) => {});

router.post("/log-out", authUser, userLogout);

router.get("/check-user", (req,res,next) =>{});



export { router as userRouter };