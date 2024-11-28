import express from "express";
import {
  createPatient,
  updatePatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  deleteAppointment,
  deleteTestReport,
  deleteMRIScan
} from "../Controllers/patientController.js";

const router = express.Router();

// Patient routes
router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

// Delete routes for appointments, test reports, and MRI scans
router.delete("/:patientId/appointment/:appointmentId", deleteAppointment);
router.delete("/:patientId/testReport/:testReportId", deleteTestReport);
router.delete("/:patientId/mriScan/:mriScanId", deleteMRIScan);

export default router;
