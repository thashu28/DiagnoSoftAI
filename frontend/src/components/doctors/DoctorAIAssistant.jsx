import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiPlus, FiMessageSquare, FiCpu, FiUser } from 'react-icons/fi';

const DoctorAIAssistant = () => {
  const doctorId = JSON.parse(localStorage.getItem('user'))?.id;
  
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem(`doctorChatHistory_${doctorId}`);
    return saved ? JSON.parse(saved) : [{
      id: 'default',
      title: 'New conversation',
      messages: [{
        sender: 'bot',
        text: 'Hello Doctor! I am your medical AI assistant. How can I help you today?',
        timestamp: new Date().toLocaleTimeString()
      }]
    }];
  });
  const [currentConversationId, setCurrentConversationId] = useState('default');
  
  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation.messages;

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (doctorId) {
      localStorage.setItem(`doctorChatHistory_${doctorId}`, JSON.stringify(conversations));
    }
  }, [conversations, doctorId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'You',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const isFirstUserMessage = conv.messages.length === 1; // Only bot's welcome message
        return {
          ...conv,
          title: isFirstUserMessage ? inputMessage.slice(0, 30) + '...' : conv.title,
          messages: [...conv.messages, userMessage]
        };
      }
      return conv;
    }));

    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot/chat', {
        message: inputMessage,
        userId: doctorId,
        userType: 'doctor'
      });

      const botResponse = {
        sender: 'bot',
        text: response.data.response, 
        timestamp: new Date().toLocaleTimeString()  
      };
      

      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, messages: [...conv.messages, botResponse] }
          : conv
      ));
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'I apologize, but I encountered an error. Please try again later.',
        timestamp: new Date().toLocaleTimeString()
      };
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, messages: [...conv.messages, errorMessage] }
          : conv
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: 'New conversation',
      messages: [{
        sender: 'bot',
        text: 'Hello Doctor! I am your medical AI assistant. How can I help you today?',
        timestamp: new Date().toLocaleTimeString()
      }]
    };
    setConversations(prev => [...prev, newConversation]);
    setCurrentConversationId(newId);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar with Chat History */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={createNewConversation}
            className="w-full py-3 px-4 flex items-center justify-center space-x-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <FiPlus className="w-5 h-5" /> 
            <span className="font-medium">New Chat</span>
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setCurrentConversationId(conv.id)}
              className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                conv.id === currentConversationId
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-600'
                  : 'text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    conv.id === currentConversationId ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <FiMessageSquare className={`w-4 h-4 ${
                      conv.id === currentConversationId ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{conv.title}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {conv.messages[conv.messages.length - 1]?.text.substring(0, 40)}...
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-800">Doctor AI Assistant</h2>
          <p className="text-sm text-gray-500">Ask me anything about medical diagnoses and treatments...</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[80%]`}>
                {msg.sender !== 'You' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                    <FiCpu className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === 'You'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'You' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
                {msg.sender === 'You' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-2xl px-4 py-3">
                <div className="animate-pulse flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 p-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`p-4 rounded-full ${
                isLoading
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors duration-200 shadow-sm`}
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAIAssistant;
