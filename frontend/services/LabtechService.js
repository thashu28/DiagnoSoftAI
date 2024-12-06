import HTTPCommon from "../helpers/httpcommon";

// Service for Lab Technician-related API calls
const LabTechService = {
  // Create a new lab technician
  createLabTech: async (labTechData) => {
    try {
      const response = await HTTPCommon.post("/labtech", labTechData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create lab technician");
    }
  },

  // Get all lab technicians
  getAllLabTechs: async () => {
    try {
      const response = await HTTPCommon.get("/labtech");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch lab technicians");
    }
  },

  // Get a lab technician by ID
  getLabTechById: async (id) => {
    try {
      const response = await HTTPCommon.get(`/api/labtech/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch lab technician");
    }
  },

  // Update a lab technician's information
  updateLabTech: async (id, updatedData) => {
    try {
      const response = await HTTPCommon.put(`/labtech/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update lab technician");
    }
  },

  // Delete a lab technician
  deleteLabTech: async (id) => {
    try {
      const response = await HTTPCommon.delete(`/labtech/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete lab technician");
    }
  },

  // Get pending MRI scans
  getPendingMRIScans: async () => {
    try {
      const response = await HTTPCommon.get("/labtech/pending-mri-scans");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch pending MRI scans");
    }
  },

  // Get pending test reports
  getPendingTestReports: async () => {
    try {
      const response = await HTTPCommon.get("/labtech/pending-test-reports");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch pending test reports");
    }
  },
};

export default LabTechService;


