// tests/labtechController.test.js

import { jest } from '@jest/globals';
import {
  createLabTech,
  getAllLabTechs,
  getLabTechById,
  updateLabTech,
  deleteLabTech,
} from '../Controllers/labtechController.js';
import LabTech from '../models/LabTechSchema.js';

jest.mock('../models/LabTechSchema.js');

describe('LabTech Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLabTech', () => {
    it('should create a new lab technician', async () => {
      const req = {
        body: {
          name: 'Lab Technician Name',
          age: 30,
          dob: '1991-01-01',
          gender: 'female',
          email: 'labtech@example.com',
          password: 'password123',
          phone: '123-456-7890',
          role: 'labtech',
          experience: 5,
          qualification: 'B.Sc in Medical Technology',
          testConducted: ['Blood Test', 'Urine Test'],
          specializedIn: ['Hematology'],
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.create.mockResolvedValue({
        _id: 'labTechId',
        ...req.body,
      });

      await createLabTech(req, res);

      expect(LabTech.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Lab technician created',
        data: {
          _id: 'labTechId',
          ...req.body,
        },
      });
    });

    it('should handle errors during lab technician creation', async () => {
      const req = {
        body: {
          email: 'invalid-email',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.create.mockRejectedValue(new Error('Invalid email format'));

      await createLabTech(req, res);

      expect(LabTech.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid email format',
      });
    });
  });

  describe('getAllLabTechs', () => {
    it('should return all lab technicians', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const labTechs = [
        {
          _id: 'labTechId1',
          name: 'Lab Tech One',
          qualification: 'Qualification A',
        },
        {
          _id: 'labTechId2',
          name: 'Lab Tech Two',
          qualification: 'Qualification B',
        },
      ];

      LabTech.find.mockResolvedValue(labTechs);

      await getAllLabTechs(req, res);

      expect(LabTech.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: labTechs,
      });
    });

    it('should handle errors during fetching lab technicians', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.find.mockRejectedValue(new Error('Database error'));

      await getAllLabTechs(req, res);

      expect(LabTech.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('getLabTechById', () => {
    it('should return a lab technician by ID', async () => {
      const req = {
        params: {
          id: 'labTechId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const labTech = {
        _id: 'labTechId1',
        name: 'Lab Tech One',
        qualification: 'Qualification A',
      };

      LabTech.findById.mockResolvedValue(labTech);

      await getLabTechById(req, res);

      expect(LabTech.findById).toHaveBeenCalledWith('labTechId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: labTech,
      });
    });

    it('should return 404 if lab technician not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.findById.mockResolvedValue(null);

      await getLabTechById(req, res);

      expect(LabTech.findById).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Lab technician not found',
      });
    });

    it('should handle errors during fetching lab technician by ID', async () => {
      const req = {
        params: {
          id: 'labTechId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.findById.mockRejectedValue(new Error('Database error'));

      await getLabTechById(req, res);

      expect(LabTech.findById).toHaveBeenCalledWith('labTechId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('updateLabTech', () => {
    it('should update a lab technician by ID', async () => {
      const req = {
        params: {
          id: 'labTechId1',
        },
        body: {
          qualification: 'Updated Qualification',
          experience: 6,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedLabTech = {
        _id: 'labTechId1',
        name: 'Lab Tech One',
        qualification: 'Updated Qualification',
        experience: 6,
      };

      LabTech.findByIdAndUpdate.mockResolvedValue(updatedLabTech);

      await updateLabTech(req, res);

      expect(LabTech.findByIdAndUpdate).toHaveBeenCalledWith('labTechId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedLabTech,
      });
    });

    it('should return 404 if lab technician to update is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
        body: {
          qualification: 'Updated Qualification',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.findByIdAndUpdate.mockResolvedValue(null);

      await updateLabTech(req, res);

      expect(LabTech.findByIdAndUpdate).toHaveBeenCalledWith('nonexistentId', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Lab technician not found',
      });
    });

    it('should handle errors during lab technician update', async () => {
      const req = {
        params: {
          id: 'labTechId1',
        },
        body: {
          qualification: 'Updated Qualification',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      await updateLabTech(req, res);

      expect(LabTech.findByIdAndUpdate).toHaveBeenCalledWith('labTechId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('deleteLabTech', () => {
    it('should delete a lab technician by ID', async () => {
      const req = {
        params: {
          id: 'labTechId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const deletedLabTech = {
        _id: 'labTechId1',
        name: 'Lab Tech One',
      };

      LabTech.findByIdAndDelete.mockResolvedValue(deletedLabTech);

      await deleteLabTech(req, res);

      expect(LabTech.findByIdAndDelete).toHaveBeenCalledWith('labTechId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Lab technician deleted',
      });
    });

    it('should return 404 if lab technician to delete is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.findByIdAndDelete.mockResolvedValue(null);

      await deleteLabTech(req, res);

      expect(LabTech.findByIdAndDelete).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Lab technician not found',
      });
    });

    it('should handle errors during lab technician deletion', async () => {
      const req = {
        params: {
          id: 'labTechId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LabTech.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await deleteLabTech(req, res);

      expect(LabTech.findByIdAndDelete).toHaveBeenCalledWith('labTechId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });
});
