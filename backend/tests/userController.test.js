import { jest } from '@jest/globals';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../Controllers/userController.js';
import User from '../models/UserSchema.js';

jest.mock('../models/UserSchema.js');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    // Existing tests for createUser...
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const users = [
        { _id: 'userId1', name: 'User One', email: 'user1@example.com' },
        { _id: 'userId2', name: 'User Two', email: 'user2@example.com' },
      ];

      User.find.mockResolvedValue(users);

      await getAllUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: users,
      });
    });

    it('should handle errors during fetching users', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.find.mockRejectedValue(new Error('Database error'));

      await getAllUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const req = {
        params: {
          id: 'userId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = { _id: 'userId1', name: 'User One', email: 'user1@example.com' };

      User.findById.mockResolvedValue(user);

      await getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('userId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: user,
      });
    });

    it('should return 404 if user not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findById.mockResolvedValue(null);

      await getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found',
      });
    });

    it('should handle errors during fetching user by ID', async () => {
      const req = {
        params: {
          id: 'userId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findById.mockRejectedValue(new Error('Database error'));

      await getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('userId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user by ID', async () => {
      const req = {
        params: {
          id: 'userId1',
        },
        body: {
          name: 'Updated User',
          email: 'updated@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedUser = {
        _id: 'userId1',
        name: 'Updated User',
        email: 'updated@example.com',
      };

      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('userId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedUser,
      });
    });

    it('should return 404 if user to update is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
        body: {
          name: 'Updated User',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndUpdate.mockResolvedValue(null);

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('nonexistentId', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found',
      });
    });

    it('should handle errors during user update', async () => {
      const req = {
        params: {
          id: 'userId1',
        },
        body: {
          name: 'Updated User',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('userId1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const req = {
        params: {
          id: 'userId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const deletedUser = {
        _id: 'userId1',
        name: 'User One',
        email: 'user1@example.com',
      };

      User.findByIdAndDelete.mockResolvedValue(deletedUser);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('userId1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User deleted',
      });
    });

    it('should return 404 if user to delete is not found', async () => {
      const req = {
        params: {
          id: 'nonexistentId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndDelete.mockResolvedValue(null);

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('nonexistentId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found',
      });
    });

    it('should handle errors during user deletion', async () => {
      const req = {
        params: {
          id: 'userId1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('userId1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
      });
    });
  });
});
