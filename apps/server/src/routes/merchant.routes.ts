import { Router } from "express";
// @ts-expect-error Controller is JavaScript and has no type declarations
import { createMerchant, getMerchant } from "../controllers/merchant.controller.js";


const router = Router();

router.post("/", createMerchant);
router.get("/:merchantId", getMerchant);

export default router;
