// tests/authController.test.js
import { jest } from '@jest/globals';
import { signup, login } from '../Controllers/authController.js';
import User from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock the dependencies
jest.mock('../models/UserSchema.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {

    it('should return an error when the email already exists', async () => {
      const req = {
        body: {
          email: 'test@example.com',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock User.findOne to return a user (email already exists)
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('login', () => {
    it('should log in a user with correct credentials', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        role: 'patient',
      };

      // Mock User.findOne to return a user
      User.findOne.mockResolvedValue(user);

      // Mock bcrypt.compare to return true (passwords match)
      bcrypt.compare.mockResolvedValue(true);

      // Mock jwt.sign
      jwt.sign.mockReturnValue('token');

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15d' }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Login successful',
        token: 'token',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });

    it('should return an error when the user is not found', async () => {
      const req = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password123',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock User.findOne to return null (user not found)
      User.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return an error when the password is incorrect', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        role: 'patient',
      };

      // Mock User.findOne to return a user
      User.findOne.mockResolvedValue(user);

      // Mock bcrypt.compare to return false (passwords do not match)
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });
});
