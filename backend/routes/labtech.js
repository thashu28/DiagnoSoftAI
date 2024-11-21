import express from "express";
import {
  createLabTech,
  updateLabTech,
  deleteLabTech,
  getAllLabTechs,
  getLabTechById
} from "../Controllers/labtechController.js"; 

const router = express.Router();

router.post("/", createLabTech);
router.get("/", getAllLabTechs);
router.get("/:id", getLabTechById);
router.put("/:id", updateLabTech);
router.delete("/:id", deleteLabTech);

export default router;
