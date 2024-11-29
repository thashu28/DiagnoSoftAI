import express from "express";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  getAppointmentsByDoctorId
} from "../Controllers/doctorController.js";

const router = express.Router();

router.post("/", createDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

router.get("/appointments/:doctorId", getAppointmentsByDoctorId);

export default router;




