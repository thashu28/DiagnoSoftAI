// import Patient from "../models/patientSchema.js";

// // Create a new patient
// export const createPatient = async (req, res) => {
//   try {
//     const newPatient = await Patient.create(req.body);
//     res.status(201).json({ success: true, message: "Patient created", data: newPatient });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Get all patients
// export const getAllPatients = async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.status(200).json({ success: true, data: patients });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get a single patient by ID
// export const getPatientById = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });
//     res.status(200).json({ success: true, data: patient });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update a patient
// export const updatePatient = async (req, res) => {
//   try {
//     const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedPatient) return res.status(404).json({ success: false, message: "Patient not found" });
//     res.status(200).json({ success: true, data: updatedPatient });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Delete a patient
// export const deletePatient = async (req, res) => {
//   try {
//     const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
//     if (!deletedPatient) return res.status(404).json({ success: false, message: "Patient not found" });
//     res.status(200).json({ success: true, message: "Patient deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import Patient from "../models/patientSchema.js";

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({ success: true, message: "Patient created", data: newPatient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("appointments doctor")
      .populate("reports")
      .populate("mriScans.requestedBy")
      .populate("testReports.requestedBy");
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("appointments doctor")
      .populate("reports")
      .populate("mriScans.requestedBy")
      .populate("testReports.requestedBy");
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a patient
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("appointments doctor")
      .populate("reports")
      .populate("mriScans.requestedBy")
      .populate("testReports.requestedBy");
    if (!updatedPatient) return res.status(404).json({ success: false, message: "Patient not found" });
    res.status(200).json({ success: true, data: updatedPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ success: false, message: "Patient not found" });
    res.status(200).json({ success: true, message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add an appointment to a patient
export const addAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    patient.appointments.push(req.body);
    await patient.save();

    res.status(201).json({ success: true, message: "Appointment added", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a test report to a patient
export const addTestReport = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    patient.testReports.push(req.body);
    await patient.save();

    res.status(201).json({ success: true, message: "Test report added", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add an MRI scan to a patient
export const addMRIScan = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    patient.mriScans.push(req.body);
    await patient.save();

    res.status(201).json({ success: true, message: "MRI scan added", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an appointment from a patient
export const deleteAppointment = async (req, res) => {
  try {
    const { patientId, appointmentId } = req.params;
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    const appointmentIndex = patient.appointments.findIndex(appointment => appointment._id.toString() === appointmentId);
    if (appointmentIndex === -1) return res.status(404).json({ success: false, message: "Appointment not found" });

    patient.appointments.splice(appointmentIndex, 1);
    await patient.save();

    res.status(200).json({ success: true, message: "Appointment deleted", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a test report from a patient
export const deleteTestReport = async (req, res) => {
  try {
    const { patientId, testReportId } = req.params;
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    const testReportIndex = patient.testReports.findIndex(report => report._id.toString() === testReportId);
    if (testReportIndex === -1) return res.status(404).json({ success: false, message: "Test report not found" });

    patient.testReports.splice(testReportIndex, 1);
    await patient.save();

    res.status(200).json({ success: true, message: "Test report deleted", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an MRI scan from a patient
export const deleteMRIScan = async (req, res) => {
  try {
    const { patientId, mriScanId } = req.params;
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    const mriScanIndex = patient.mriScans.findIndex(scan => scan._id.toString() === mriScanId);
    if (mriScanIndex === -1) return res.status(404).json({ success: false, message: "MRI scan not found" });

    patient.mriScans.splice(mriScanIndex, 1);
    await patient.save();

    res.status(200).json({ success: true, message: "MRI scan deleted", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
