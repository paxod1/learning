import e from "express";
import { authUser } from "../middlewares/authUser.js";
const router = e.Router();
import Stripe from "stripe";
const client_domain = process.env.CLIENT_DOMAIN;

const stripe = new Stripe(process.env.Stripe_Private_Api_Key);

router.post('/create-checkout-session', authUser, async (req, res, next) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.courseId?.title,
                    images: [product?.courseId?.image],
                },
                unit_amount: Math.round(product?.courseId?.price * 100),
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });
        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        next(error);
    }
});


export { router as paymentRouter };