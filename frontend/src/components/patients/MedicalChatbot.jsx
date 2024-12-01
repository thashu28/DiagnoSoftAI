import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';

const MedicalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your medical assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'You',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot/chat', {
        message: inputMessage
      });

      const botResponse = {
        sender: 'bot',
        text: response.data.message,
        timestamp: new Date(response.data.timestamp).toLocaleTimeString()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'I apologize, but I encountered an error. Please try again later.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg h-full flex flex-col">
      <div className="flex-grow p-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === 'You' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                msg.sender === 'You'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="text-base">{msg.text}</p>
              <p className="text-xs opacity-70 mt-2">{msg.timestamp}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-base">Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-6 border-t bg-gray-50">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Ask me anything about health..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className={`p-4 rounded-lg ${
              isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            <FiSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalChatbot; 