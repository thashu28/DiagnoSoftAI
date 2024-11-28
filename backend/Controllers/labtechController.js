import LabTech from "../models/LabTechSchema.js";
import Patient from "../models/patientSchema.js";
// Create a new lab technician
export const createLabTech = async (req, res) => {
  try {
    const newLabTech = await LabTech.create(req.body);
    res.status(201).json({ success: true, message: "Lab technician created", data: newLabTech });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all lab technicians
export const getAllLabTechs = async (req, res) => {
  try {
    const labTechs = await LabTech.find();
    res.status(200).json({ success: true, data: labTechs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single lab technician by ID
export const getLabTechById = async (req, res) => {
  try {
    const labTech = await LabTech.findById(req.params.id);
    if (!labTech) return res.status(404).json({ success: false, message: "Lab technician not found" });
    res.status(200).json({ success: true, data: labTech });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a lab technician's information
export const updateLabTech = async (req, res) => {
  try {
    const updatedLabTech = await LabTech.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLabTech) return res.status(404).json({ success: false, message: "Lab technician not found" });
    res.status(200).json({ success: true, data: updatedLabTech });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a lab technician
export const deleteLabTech = async (req, res) => {
  try {
    const deletedLabTech = await LabTech.findByIdAndDelete(req.params.id);
    if (!deletedLabTech) return res.status(404).json({ success: false, message: "Lab technician not found" });
    res.status(200).json({ success: true, message: "Lab technician deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Function to get pending MRI scans
export const getPendingMRIScans = async (req, res) => {
  try {
    // Fetch all patients where any MRI scan has status "Pending"
    const patientsWithPendingMRIScans = await Patient.find({
      "mriScans.status": "Pending",
    })
      .populate("mriScans.requestedBy", "name") // Populate doctor details
      .populate("appointments.doctor", "name") // Populate doctor details for appointments
      .exec();

    // Filter MRI scans which are specifically pending
    const pendingMRIScans = patientsWithPendingMRIScans.map((patient) => {
      return {
        patientName: patient.name,
        patientEmail: patient.email,
        patientPhone: patient.phone,
        mriScans: patient.mriScans.filter(scan => scan.status === "Pending"),
      };
    });

    if (pendingMRIScans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pending MRI scans found",
      });
    }

    res.status(200).json({
      success: true,
      data: pendingMRIScans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Function to get pending test reports
export const getPendingTestReports = async (req, res) => {
  try {
    // Fetch all patients where any test report has status "Pending"
    const patientsWithPendingTestReports = await Patient.find({
      "testReports.status": "Pending",
    })
      .populate("testReports.requestedBy", "name") // Populate doctor details
      .populate("appointments.doctor", "name") // Populate doctor details for appointments
      .exec();

    // Filter test reports which are specifically pending
    const pendingTestReports = patientsWithPendingTestReports.map((patient) => {
      return {
        patientName: patient.name,
        patientEmail: patient.email,
        patientPhone: patient.phone,
        testReports: patient.testReports.filter(report => report.status === "Pending"),
      };
    });

    if (pendingTestReports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pending test reports found",
      });
    }

    res.status(200).json({
      success: true,
      data: pendingTestReports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
