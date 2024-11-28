import express from "express";
import {
  createLabTech,
  updateLabTech,
  deleteLabTech,
  getAllLabTechs,
  getLabTechById,
  getPendingMRIScans,
  getPendingTestReports,
} from "../Controllers/labtechController.js"; 

const router = express.Router();

router.post("/", createLabTech);
router.get("/", getAllLabTechs);
router.get("/:id", getLabTechById);
router.put("/:id", updateLabTech);
router.delete("/:id", deleteLabTech);

// Pending MRI Scans Routes
router.get("/pending-mri-scans", getPendingMRIScans);    // Get pending MRI scans

// Pending Test Reports Routes
router.get("/pending-test-reports", getPendingTestReports);  // Get pending test reports

export default router;
