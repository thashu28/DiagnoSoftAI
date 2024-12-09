// tests/doctorController.test.js

import { jest } from '@jest/globals';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getAppointmentsByDoctorId,
} from '../Controllers/doctorController.js';
import Doctor from '../models/DoctorSchema.js';
import Patient from '../models/patientSchema.js';

jest.mock('../models/DoctorSchema.js');
jest.mock('../models/patientSchema.js');

describe('Doctor Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDoctor', () => {
    it('should create a new doctor', async () => {
      const req = {
        body: {
          name: 'Dr. Jane Smith',
          age: 40,
          dob: '1981-05-15',
          gender: 'female',
          email: 'dr.jane@example.com',
          password: 'password123',
          specialization: 'Neurology',
          phone: '123-456-7890',
          role: 'doctor',
          experience: ['Hospital X', 'Clinic Y'],
          qualifications: ['MD', 'Fellowship in Neurology'],
          department: 'Neurology',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.create.mockResolvedValue({
        _id: 'doctorId',
        ...req.body,
      });

      await createDoctor(req, res);

      expect(Doctor.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Doctor created',
        data: {
          _id: 'doctorId',
          ...req.body,
        },
      });
    });

    it('should handle errors during doctor creation', async () => {
      const req = {
        body: {
          email: 'invalid-email',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.create.mockRejectedValue(new Error('Invalid email format'));

      await createDoctor(req, res);

      expect(Doctor.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid email format',
      });
    });
  });

  describe('getAllDoctors', () => {
    it('should return all doctors', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const doctors = [
        {
          _id: 'doctorId1',
          name: 'Dr. Jane Smith',
          specialization: 'Neurology',
        },
        {
          _id: 'doctorId2',
          name: 'Dr. John Doe',
          specialization: 'Cardiology',
        },
      ];

      Doctor.find.mockResolvedValue(doctors);

      await getAllDoctors(req, res);

      expect(Doctor.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: doctors,
      });
    });

    it('should handle errors during fetching doctors', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.find.mockRejectedValue(new Error('Database error'));

      await getAllDoctors(req, res);

      expect(Doctor.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('getDoctorById', () => {
    it('should return a doctor by ID', async () => {
      const req = {
        params: {
          id: 'doctorId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const doctor = {
        _id: 'doctorId1',
        name: 'Dr. Jane Smith',
        specialization: 'Neurology',
      };

      Doctor.findById.mockResolvedValue(doctor);

      await getDoctorById(req, res);

      expect(Doctor.findById).toHaveBeenCalledWith('doctorId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: doctor,
      });
    });

    it('should return 404 if doctor not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.findById.mockResolvedValue(null);

      await getDoctorById(req, res);

      expect(Doctor.findById).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Doctor not found',
      });
    });

    it('should handle errors during fetching doctor by ID', async () => {
      const req = {
        params: {
          id: 'doctorId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.findById.mockRejectedValue(new Error('Database error'));

      await getDoctorById(req, res);

      expect(Doctor.findById).toHaveBeenCalledWith('doctorId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('updateDoctor', () => {
    it('should update a doctor by ID', async () => {
      const req = {
        params: {
          id: 'doctorId1',
        },
        body: {
          specialization: 'Updated Specialization',
          department: 'Updated Department',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedDoctor = {
        _id: 'doctorId1',
        name: 'Dr. Jane Smith',
        specialization: 'Updated Specialization',
        department: 'Updated Department',
      };

      Doctor.findByIdAndUpdate.mockResolvedValue(updatedDoctor);

      await updateDoctor(req, res);

      expect(Doctor.findByIdAndUpdate).toHaveBeenCalledWith('doctorId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedDoctor,
      });
    });

    it('should return 404 if doctor to update is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
        body: {
          specialization: 'Updated Specialization',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.findByIdAndUpdate.mockResolvedValue(null);

      await updateDoctor(req, res);

      expect(Doctor.findByIdAndUpdate).toHaveBeenCalledWith('nonexistentId', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Doctor not found',
      });
    });

    it('should handle errors during doctor update', async () => {
      const req = {
        params: {
          id: 'doctorId1',
        },
        body: {
          specialization: 'Updated Specialization',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      await updateDoctor(req, res);

      expect(Doctor.findByIdAndUpdate).toHaveBeenCalledWith('doctorId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('deleteDoctor', () => {
    it('should delete a doctor by ID', async () => {
      const req = {
        params: {
          id: 'doctorId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const deletedDoctor = {
        _id: 'doctorId1',
        name: 'Dr. Jane Smith',
        specialization: 'Neurology',
      };

      Doctor.findByIdAndDelete.mockResolvedValue(deletedDoctor);

      await deleteDoctor(req, res);

      expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith('doctorId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Doctor deleted',
      });
    });

    it('should return 404 if doctor to delete is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.findByIdAndDelete.mockResolvedValue(null);

      await deleteDoctor(req, res);

      expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Doctor not found',
      });
    });

    it('should handle errors during doctor deletion', async () => {
      const req = {
        params: {
          id: 'doctorId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Doctor.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await deleteDoctor(req, res);

      expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith('doctorId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('getAppointmentsByDoctorId', () => {
    it('should return appointments for a specific doctor', async () => {
      const req = {
        params: {
          doctorId: 'doctorId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockPatients = [
        {
          name: 'Patient One',
          email: 'patient1@example.com',
          appointments: [
            {
              doctor: {
                toString: () => 'doctorId1',
                name: 'Dr. Smith',
                email: 'dr.smith@example.com',
                specialization: 'Cardiology',
              },
              date: '2024-03-20',
              time: '10:00 AM',
            },
          ],
        },
      ];

      Patient.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockPatients),
        }),
      });

      await getAppointmentsByDoctorId(req, res);

      expect(Patient.find).toHaveBeenCalledWith({
        'appointments.doctor': 'doctorId1',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            patientName: 'Patient One',
            patientEmail: 'patient1@example.com',
          }),
        ]),
      });
    });

    it('should return 404 if no appointments found', async () => {
      const req = {
        params: {
          doctorId: 'doctorId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        }),
      });

      await getAppointmentsByDoctorId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No appointments found for this doctor',
      });
    });

    it('should handle errors', async () => {
      const req = {
        params: {
          doctorId: 'doctorId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Patient.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(new Error('Database error')),
        }),
      });

      await getAppointmentsByDoctorId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });
});
