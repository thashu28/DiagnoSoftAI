import express from "express";
import {
  createPatient,
  updatePatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  addAppointment,
  addTestReport,
  addMRIScan,
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

// Add routes
router.post("/:patientId/appointments", addAppointment);
router.post("/:patientId/testReports", addTestReport);
router.post("/:patientId/mriScans", addMRIScan);

// Delete routes
router.delete("/:patientId/appointments/:appointmentId", deleteAppointment);
router.delete("/:patientId/testReports/:testReportId", deleteTestReport);
router.delete("/:patientId/mriScans/:mriScanId", deleteMRIScan);

export default router;
