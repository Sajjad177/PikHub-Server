import express from "express";
import { productController } from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// router.post("/add",upload, productController.addProduct);
router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  productController.addProduct
);
router.post("/remove", productController.removeProduct);
router.post("/single", productController.singleProduct);
router.get("/list", productController.listProducts);

export const productRouter = router;
