import express from 'express';
import { generateResponse } from '../Controllers/chatbotController.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, userId, userType } = req.body;
    
    const response = await generateResponse(message, userId, userType);
    
    res.json({
      message: response,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 