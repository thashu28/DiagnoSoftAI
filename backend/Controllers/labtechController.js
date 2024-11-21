import LabTech from "../models/LabTechSchema.js";

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
