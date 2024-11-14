import e from "express";
const router = e.Router();
import { userRouter } from "./userRoutes.js";
import { mentorRouter } from "./mentorRoutes.js";
import { courseRouter } from "./courseRoute.js";
import { cartRouter } from "./cartRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
import { assignmentRouter } from "./assignmentRoutes.js";
import { quizRouter } from "./quizRoutes.js";
import { lectureRouter } from "./lectureRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";
import { searchRouter } from "./searchRoutes.js";

router.use('/user', userRouter)
router.use('/mentor', mentorRouter)
router.use('/course', courseRouter)
router.use('/cart', cartRouter)
router.use('/admin', adminRouter)
router.use('/review', reviewRouter)
router.use('/assignment', assignmentRouter)
router.use('/quiz', quizRouter)
router.use('/lectures', lectureRouter)
router.use('/payment',paymentRouter)
router.use('/search',searchRouter)




export { router as apiRouter }