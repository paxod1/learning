import e from "express";
const router = e.Router();

router.get("/all-courses", (req, res, next) => {});
router.get("/courseDetails/:id", (req, res, next) => {});
router.post("/create", (req, res, next) => {});
router.put("/update", (req, res, next) => {});
router.delete("/delete",(req, res, next) => {});

export { router as courseRouter };