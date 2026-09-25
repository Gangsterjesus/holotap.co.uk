import { Router } from "express";
import {
  createMerchant,
  getMerchant,
} from "../controllers/merchant.controller";

const router = Router();

router.post("/", createMerchant);
router.get("/:merchantId", getMerchant);

export default router;