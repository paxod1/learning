import e from "express";
import { adminLogin, adminLogout, adminProfile, checkAdmin } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/authAdmin.js";


const router = e.Router();

router.post("/log-in", adminLogin);

router.get("/profile", authAdmin, adminProfile);

//router.put("/profile-update", mentorProfile);

//router.delete("/profile-delete", (req, res, next) => {});

router.post("/log-out", authAdmin, adminLogout);

router.get("/check-admin", authAdmin, checkAdmin);


export { router as adminRouter };