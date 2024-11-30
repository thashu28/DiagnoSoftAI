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
    const patients = await Patient.find();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a patient
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

// Add a new appointment to the patient
export const addAppointment = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { doctor, date, time, condition, description } = req.body;
    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });
    
    // Create a new appointment object
    const newAppointment = {
      doctor,
      date,
      time,
      condition,
      description,
    };

    // Add the appointment to the patient's appointments array
    patient.appointments.push(newAppointment);

    // Save the patient with the new appointment
    await patient.save();
    res.status(201).json({ success: true, message: "Appointment added", data: newAppointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete an appointment
// Delete an appointment for the patient
export const deleteAppointment = async (req, res) => {
  try {
    const { patientId, appointmentId } = req.params;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    // Find the appointment to delete
    const appointmentIndex = patient.appointments.findIndex(appointment => appointment._id.toString() === appointmentId);
    if (appointmentIndex === -1) return res.status(404).json({ success: false, message: "Appointment not found" });

    // Remove the appointment
    patient.appointments.splice(appointmentIndex, 1);
    await patient.save();

    res.status(200).json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Add a test report
// Add a new test report to the patient
export const addTestReport = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { testType, fileUrl, description, requestedBy, status, comments } = req.body;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    // Create a new test report object
    const newTestReport = {
      testType,
      fileUrl,
      description,
      requestedBy,
      status,
      comments,
    };

    // Add the test report to the patient's testReports array
    patient.testReports.push(newTestReport);

    // Save the patient with the new test report
    await patient.save();

    res.status(201).json({ success: true, message: "Test report added", data: newTestReport });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete a test report
// Delete a test report for the patient
export const deleteTestReport = async (req, res) => {
  try {
    const { patientId, testReportId } = req.params;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    // Find the test report to delete
    const testReportIndex = patient.testReports.findIndex(testReport => testReport._id.toString() === testReportId);
    if (testReportIndex === -1) return res.status(404).json({ success: false, message: "Test report not found" });

    // Remove the test report
    patient.testReports.splice(testReportIndex, 1);
    await patient.save();

    res.status(200).json({ success: true, message: "Test report deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Add an MRI scan
// Add a new MRI scan to the patient
export const addMRIScan = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { scanType, fileUrl, description, requestedBy, status, comments } = req.body;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    // Create a new MRI scan object
    const newMRIScan = {
      scanType,
      fileUrl,
      description,
      requestedBy,
      status,
      comments,
    };

    // Add the MRI scan to the patient's mriScans array
    patient.mriScans.push(newMRIScan);

    // Save the patient with the new MRI scan
    await patient.save();

    res.status(201).json({ success: true, message: "MRI scan added", data: newMRIScan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete an MRI scan
// Delete an MRI scan for the patient
export const deleteMRIScan = async (req, res) => {
  try {
    const { patientId, mriScanId } = req.params;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    // Find the MRI scan to delete
    const mriScanIndex = patient.mriScans.findIndex(mriScan => mriScan._id.toString() === mriScanId);
    if (mriScanIndex === -1) return res.status(404).json({ success: false, message: "MRI scan not found" });

    // Remove the MRI scan
    patient.mriScans.splice(mriScanIndex, 1);
    await patient.save();

    res.status(200).json({ success: true, message: "MRI scan deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

