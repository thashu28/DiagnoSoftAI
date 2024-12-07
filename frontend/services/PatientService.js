import httpCommon from "./../helpers/httpcommon";


// Create a new patient
export const createPatient = async (patientData) => {
  try {
    const response = await httpCommon.post('/patients', patientData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all patients
export const getAllPatients = async () => {
  try {
    const response = await httpCommon.get('/api/patients');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get a single patient by ID
export const getPatientById = async (patientId) => {
  try {
    const response = await httpCommon.get(`/api/patients/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update a patient
export const updatePatient = async (patientId, patientData) => {
  try {
    const response = await httpCommon.put(`/api/patients/${patientId}`, patientData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a patient
export const deletePatient = async (patientId) => {
  try {
    const response = await httpCommon.delete(`/api/patients/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Add a new appointment to the patient
export const addAppointment = async (patientId, appointmentData) => {
  try {
    const response = await httpCommon.post(`/api/patients/${patientId}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Reschedule an appointment
export const rescheduleAppointment = async (patientId, appointmentId, rescheduleData) => {
  try {
    const response = await httpCommon.post(`/api/patients/${patientId}/appointments/${appointmentId}/reschedule`, rescheduleData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an appointment
export const deleteAppointment = async (patientId, appointmentId) => {
  try {
    const response = await httpCommon.delete(`api/patients/${patientId}/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Add a test report to the patient
export const addTestReport = async (patientId, testReportData) => {
  try {
    const response = await httpCommon.post(`api/patients/${patientId}/testReports`, testReportData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a test report
export const deleteTestReport = async (patientId, testReportId) => {
  try {
    const response = await httpCommon.delete(`api/patients/${patientId}/testReports/${testReportId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Add an MRI scan to the patient
export const addMRIScan = async (patientId, mriScanData) => {
  try {
    const response = await httpCommon.post(`api/patients/${patientId}/mriScans`, mriScanData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an MRI scan
export const deleteMRIScan = async (patientId, mriScanId) => {
  try {
    const response = await httpCommon.delete(`api/patients/${patientId}/mriScans/${mriScanId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};



