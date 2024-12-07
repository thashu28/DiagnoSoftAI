import Doctor from "../models/DoctorSchema.js";
import Patient from "../models/patientSchema.js";
// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, message: "Doctor created", data: newDoctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// Get a single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
   
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a doctor
export const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDoctor) return res.status(404).json({ success: false, message: "Doctor not found" });
    res.status(200).json({ success: true, data: updatedDoctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ success: false, message: "Doctor not found" });
    res.status(200).json({ success: true, message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params; // Extract doctorId from request params

    // Find patients with appointments linked to the specific doctor
    const patientsWithAppointments = await Patient.find({
      "appointments.doctor": doctorId, // Match appointments by doctor ID
    })
      .populate({
        path: "appointments.doctor",
        select: "name email specialization", // Select specific doctor fields
      })
      .exec();

    // Structure the response for each patient's relevant appointments
    const appointments = patientsWithAppointments.map((patient) => ({
      patientName: patient.name,
      patientEmail: patient.email,
      appointments: patient.appointments.filter(
        (appointment) => appointment.doctor.toString() === doctorId // Filter relevant appointments
      ),
    }));

    if (appointments.length === 0) {
      return res.status(404).json({ success: false, message: "No appointments found for this doctor" });
    }

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

