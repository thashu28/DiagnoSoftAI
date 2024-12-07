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
  deleteMRIScan,
  rescheduleAppointment,
  addDiagnosisReport
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

// reschedule the appointment
router.post('/:patientId/appointments/:appointmentId/reschedule', rescheduleAppointment);

// Add/update diagnosis and report for an MRI scan
router.post("/:patientId/mriScans/:mriScanId/diagnosisReport", addDiagnosisReport);

// Delete routes
router.delete("/:patientId/appointments/:appointmentId", deleteAppointment);
router.delete("/:patientId/testReports/:testReportId", deleteTestReport);
router.delete("/:patientId/mriScans/:mriScanId", deleteMRIScan);

export default router;
