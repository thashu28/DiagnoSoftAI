// tests/patientController.test.js

import { jest } from '@jest/globals';
import Patient from '../models/patientSchema.js';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addAppointment,
  deleteAppointment,
  addTestReport,
  deleteTestReport,
  addMRIScan,
  deleteMRIScan,
} from '../Controllers/patientController.js';

jest.mock('../models/patientSchema.js');

describe('Patient Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPatient', () => {
    it('should create a new patient', async () => {
      const req = {
        body: {
          name: 'Patient Name',
          age: 30,
          dob: '1991-01-01',
          gender: 'male',
          email: 'patient@example.com',
          password: 'password123',
          phone: '123-456-7890',
          role: 'patient',
          bloodType: 'O+',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.create.mockResolvedValue({
        _id: 'patientId',
        ...req.body,
      });

      await createPatient(req, res);

      expect(Patient.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Patient created',
        data: {
          _id: 'patientId',
          ...req.body,
        },
      });
    });

    it('should handle errors during patient creation', async () => {
      const req = {
        body: {
          email: 'invalid-email',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.create.mockRejectedValue(new Error('Invalid email format'));

      await createPatient(req, res);

      expect(Patient.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid email format',
      });
    });
  });

  describe('getAllPatients', () => {
    it('should return all patients', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patients = [
        {
          _id: 'patientId1',
          name: 'Patient One',
          email: 'patient1@example.com',
        },
        {
          _id: 'patientId2',
          name: 'Patient Two',
          email: 'patient2@example.com',
        },
      ];

      Patient.find.mockResolvedValue(patients);

      await getAllPatients(req, res);

      expect(Patient.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: patients,
      });
    });

    it('should handle errors during fetching patients', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.find.mockRejectedValue(new Error('Database error'));

      await getAllPatients(req, res);

      expect(Patient.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('getPatientById', () => {
    it('should return a patient by ID', async () => {
      const req = {
        params: {
          id: 'patientId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        name: 'Patient One',
        email: 'patient1@example.com',
      };

      Patient.findById.mockResolvedValue(patient);

      await getPatientById(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: patient,
      });
    });

    it('should return 404 if patient not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockResolvedValue(null);

      await getPatientById(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });

    it('should handle errors during fetching patient by ID', async () => {
      const req = {
        params: {
          id: 'patientId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockRejectedValue(new Error('Database error'));

      await getPatientById(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('updatePatient', () => {
    it('should update a patient by ID', async () => {
      const req = {
        params: {
          id: 'patientId1',
        },
        body: {
          phone: '987-654-3210',
          allergies: ['Peanuts'],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedPatient = {
        _id: 'patientId1',
        name: 'Patient One',
        phone: '987-654-3210',
        allergies: ['Peanuts'],
      };

      Patient.findByIdAndUpdate.mockResolvedValue(updatedPatient);

      await updatePatient(req, res);

      expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith('patientId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedPatient,
      });
    });

    it('should return 404 if patient to update is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
        body: {
          phone: '987-654-3210',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findByIdAndUpdate.mockResolvedValue(null);

      await updatePatient(req, res);

      expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith('nonexistentId', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });

    it('should handle errors during patient update', async () => {
      const req = {
        params: {
          id: 'patientId1',
        },
        body: {
          phone: '987-654-3210',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      await updatePatient(req, res);

      expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith('patientId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('deletePatient', () => {
    it('should delete a patient by ID', async () => {
      const req = {
        params: {
          id: 'patientId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const deletedPatient = {
        _id: 'patientId1',
        name: 'Patient One',
      };

      Patient.findByIdAndDelete.mockResolvedValue(deletedPatient);

      await deletePatient(req, res);

      expect(Patient.findByIdAndDelete).toHaveBeenCalledWith('patientId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Patient deleted',
      });
    });

    it('should return 404 if patient to delete is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findByIdAndDelete.mockResolvedValue(null);

      await deletePatient(req, res);

      expect(Patient.findByIdAndDelete).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });

    it('should handle errors during patient deletion', async () => {
      const req = {
        params: {
          id: 'patientId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await deletePatient(req, res);

      expect(Patient.findByIdAndDelete).toHaveBeenCalledWith('patientId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  // Tests for addAppointment, deleteAppointment, addTestReport, deleteTestReport, addMRIScan, deleteMRIScan

  describe('addAppointment', () => {
    it('should add a new appointment to the patient', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
        },
        body: {
          doctor: 'doctorId',
          date: '2021-12-01',
          time: '10:00 AM',
          condition: 'routine',
          description: 'Regular check-up',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        appointments: [],
        save: jest.fn().mockResolvedValue(true),
      };

      Patient.findById.mockResolvedValue(patient);

      await addAppointment(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(patient.appointments.length).toBe(1);
      expect(patient.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Appointment added',
        data: patient.appointments[0],
      });
    });

    it('should return 404 if patient not found', async () => {
      const req = {
        params: {
          patientId: 'nonexistentId',
        },
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockResolvedValue(null);

      await addAppointment(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });
  });

  describe('deleteAppointment', () => {
    it('should delete an appointment from the patient', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
          appointmentId: 'appointmentId1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        appointments: [
          {
            _id: 'appointmentId1',
            doctor: 'doctorId',
            date: '2021-12-01',
          },
        ],
        save: jest.fn().mockResolvedValue(true),
      };

      Patient.findById.mockResolvedValue(patient);

      await deleteAppointment(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(patient.appointments.length).toBe(0);
      expect(patient.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Appointment deleted',
      });
    });

    it('should return 404 if appointment not found', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
          appointmentId: 'nonexistentAppointmentId',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        appointments: [],
      };

      Patient.findById.mockResolvedValue(patient);

      await deleteAppointment(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Appointment not found',
      });
    });

    it('should return 404 if patient not found', async () => {
      const req = {
        params: {
          patientId: 'nonexistentId',
          appointmentId: 'appointmentId1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockResolvedValue(null);

      await deleteAppointment(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });
  });

  describe('addTestReport', () => {
    it('should add a new test report to the patient', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
        },
        body: {
          testType: 'Blood Test',
          fileUrl: 'http://example.com/test.pdf',
          description: 'Routine blood work',
          requestedBy: 'doctorId1',
          status: 'pending',
          comments: 'Fasting required',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        testReports: [],
        save: jest.fn().mockResolvedValue(true),
      };

      Patient.findById.mockResolvedValue(patient);

      await addTestReport(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(patient.testReports.length).toBe(1);
      expect(patient.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Test report added',
        data: expect.objectContaining(req.body),
      });
    });

    it('should return 404 if patient not found', async () => {
      const req = {
        params: {
          patientId: 'nonexistentId',
        },
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockResolvedValue(null);

      await addTestReport(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });

    it('should handle errors', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
        },
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockRejectedValue(new Error('Database error'));

      await addTestReport(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('deleteTestReport', () => {
    it('should delete a test report from the patient', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
          testReportId: 'testReportId1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        testReports: [
          {
            _id: 'testReportId1',
            testType: 'Blood Test',
            fileUrl: 'http://example.com/test.pdf',
            toString: () => 'testReportId1',
          },
        ],
        save: jest.fn().mockResolvedValue(true),
      };

      Patient.findById.mockResolvedValue(patient);

      await deleteTestReport(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(patient.testReports.length).toBe(0);
      expect(patient.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Test report deleted',
      });
    });

    it('should return 404 if test report not found', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
          testReportId: 'nonexistentReportId',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        testReports: [],
      };

      Patient.findById.mockResolvedValue(patient);

      await deleteTestReport(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Test report not found',
      });
    });

    it('should return 404 if patient not found', async () => {
      const req = {
        params: {
          patientId: 'nonexistentId',
          testReportId: 'testReportId1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockResolvedValue(null);

      await deleteTestReport(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });
  });

  describe('addMRIScan', () => {
    it('should add a new MRI scan to the patient', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
        },
        body: {
          scanType: 'Brain MRI',
          fileUrl: 'http://example.com/mri.pdf',
          description: 'Brain scan',
          requestedBy: 'doctorId1',
          status: 'pending',
          comments: 'Routine scan',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        mriScans: [],
        save: jest.fn().mockResolvedValue(true),
      };

      Patient.findById.mockResolvedValue(patient);

      await addMRIScan(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(patient.mriScans.length).toBe(1);
      expect(patient.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'MRI scan added',
        data: expect.objectContaining(req.body),
      });
    });

    it('should return 404 if patient not found', async () => {
      const req = {
        params: {
          patientId: 'nonexistentId',
        },
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockResolvedValue(null);

      await addMRIScan(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });
  });

  describe('deleteMRIScan', () => {
    it('should delete an MRI scan from the patient', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
          mriScanId: 'mriScanId1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        mriScans: [
          {
            _id: 'mriScanId1',
            scanType: 'Brain MRI',
            toString: () => 'mriScanId1',
          },
        ],
        save: jest.fn().mockResolvedValue(true),
      };

      Patient.findById.mockResolvedValue(patient);

      await deleteMRIScan(req, res);

      expect(Patient.findById).toHaveBeenCalledWith('patientId1');
      expect(patient.mriScans.length).toBe(0);
      expect(patient.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'MRI scan deleted',
      });
    });

    it('should return 404 if MRI scan not found', async () => {
      const req = {
        params: {
          patientId: 'patientId1',
          mriScanId: 'nonexistentScanId',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const patient = {
        _id: 'patientId1',
        mriScans: [],
      };

      Patient.findById.mockResolvedValue(patient);

      await deleteMRIScan(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'MRI scan not found',
      });
    });

    it('should return 404 if patient not found', async () => {
      const req = {
        params: {
          patientId: 'nonexistentId',
          mriScanId: 'mriScanId1',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.findById.mockResolvedValue(null);

      await deleteMRIScan(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Patient not found',
      });
    });
  });
});
