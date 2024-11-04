import e from "express";
import { authUser } from "../middlewares/authUser";
const router = e.Router();

router.post('/create-checkout-session', async(req,res,next) => {

    const { products } = req.body;

   


})


export { router as paymentRouter };