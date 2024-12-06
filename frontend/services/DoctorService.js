import HTTPCommon from "./../helpers/httpcommon";

// Create a new doctor
export const createDoctor = async (doctorData) => {
  try {
    const response = await HTTPCommon.post("/api/doctors/", doctorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all doctors
export const getAllDoctors = async () => {
  try {
    const response = await HTTPCommon.get("/api/doctors/");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get a doctor by ID
export const getDoctorById = async (doctorId) => {
  try {
    const response = await HTTPCommon.get(`/api/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update a doctor by ID
export const updateDoctor = async (doctorId, doctorData) => {
  try {
    const response = await HTTPCommon.put(`/doctors/${doctorId}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a doctor by ID
export const deleteDoctor = async (doctorId) => {
  try {
    const response = await HTTPCommon.delete(`/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (doctorId) => {
  try {
    const response = await HTTPCommon.get(`/doctors/appointments/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
