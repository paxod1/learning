import e from "express";
const router = e.Router();

router.post("/add-to-cart", (req, res, next) => {});
router.get("/get-cart", (req, res, next) => {});
router.delete("/remove-course",(req, res, next) => {});

export { router as cartRouter };