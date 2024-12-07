import React, { useState, useEffect } from "react";
import { getAllPatients } from "../../../services/PatientService";
import { addMRIScan } from "../../../services/PatientService";
import { getAllDoctors } from "../../../services/DoctorService";

const LabTechnicianUploadScans = () => {

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] =  useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    scanType: "",
    date: "",
    fileUrl: "",
    description: "",
    comments: "",
    requestedBy:"",
  });

  const [message, setMessage] = useState(""); // To show success or error messages
  const scanTypes = ["Brain", "Spine", "Abdomen", "Pelvis", "Other"]; // Updated scan types

  // Fetch patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(()=>{
    const fetchDoctors = async ()=> {
      try{
        const response = await getAllDoctors();
        setDoctors(response.data)
      }
      catch(error){
        console.error("Error fetching requested doctor details.")
      }
    }
    fetchDoctors();
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mriScanData = {
        scanType: formData.scanType,
        fileUrl: formData.fileUrl,
        description: formData.description,
        requestedBy: formData.doctorId, 
        uploadDate: new Date().toISOString(), // Set uploadDate as the current timestamp in milliseconds
        status: "Completed",
        comments: formData.comments,
      };
      console.log(mriScanData)
      await addMRIScan(formData.patientId, mriScanData); // Call API
      setMessage("Scan uploaded successfully!");
      setFormData({
        patientId: "",
        scanType: "",
        date: "",
        fileUrl: "",
        description: "",
        comments: "",
        requestedBy:""
      }); // Reset form
    } catch (error) {
      setMessage(error.message || "Failed to upload scan.");
      console.error("Error uploading scan:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

        {/* Header */}
        <header className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 shadow-lg flex items-center justify-between">
        {/* Website Name */}
        <div className="font-serif italic text-blue-500 text-2xl tracking-wide">
          DiagnoSoftAI
        </div>
        {/* Lab Technician Dashboard Title */}
        <h1 className="text-2xl font-bold" style={{ marginRight: "30rem" }}>Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow p-6">
        {/* Upload Scan Form */}
        <section className="w-2/3 bg-white p-6 rounded-lg shadow-md mr-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload a New Scan</h2>
          {message && (
            <div className="p-3 mb-4 text-white bg-green-500 rounded">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Patient</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Scan Type</label>
              <select
                name="scanType"
                value={formData.scanType}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select a scan type</option>
                {scanTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Request by Doctor</label>
              <select
                name="doctorId"
                value={formData.requestedBy}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Scan File URL</label>
              <input
                type="url"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleInputChange}
                placeholder="Enter file URL"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter scan description"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Comments</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Enter comments"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
            >
              Upload Scan
            </button>
          </form>
        </section>

        {/* Uploaded Scans Section */}
        <section className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Scans</h2>
          <ul className="space-y-3">
            {patients.map((scan, index) => {
              // Filter only completed scans
              const completedScans = scan.mriScans.filter(scan => scan.status === "Completed");

              return completedScans.length > 0 ? (
                completedScans.map((completedScan, subIndex) => (
                  <li key={`${index}-${subIndex}`} className="p-3 border rounded-lg bg-gray-50 shadow-sm">
                    <p className="font-medium text-gray-700">{scan.patient}</p>
                    <p className="text-sm text-gray-600">{completedScan.scanType}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(completedScan.uploadDate).toLocaleString()}
                    </p>
                    <a href={completedScan.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-500">
                      View File
                    </a>
                  </li>
                ))
              ) : null; // If no completed scans, return nothing for this patient
            })}
          </ul>
        </section>

        
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center p-4 mt-auto border-t">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LabTechnicianUploadScans;
