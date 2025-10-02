import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, LogIn } from 'lucide-react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { model } from '../config/supabase';

// Simple markdown parser for chat messages
const parseMarkdown = (text) => {
  const parts = [];
  let currentIndex = 0;
  
  // Find bold text patterns **text**
  const boldRegex = /\*\*(.*?)\*\*/g;
  let match;
  
  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before bold
    if (match.index > currentIndex) {
      parts.push({ type: 'text', content: text.slice(currentIndex, match.index) });
    }
    // Add bold text
    parts.push({ type: 'bold', content: match[1] });
    currentIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (currentIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(currentIndex) });
  }
  
  return parts;
};

const MessageContent = ({ text }) => {
  const parts = parseMarkdown(text);
  
  return (
    <span>
      {parts.map((part, index) => {
        if (part.type === 'bold') {
          return <strong key={index} className="font-semibold">{part.content}</strong>;
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
};

const Chatbot = () => {
  const { user, loading } = useSupabaseAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: user 
        ? "Hello! I'm Digital Sathi AI. I can help you with digital literacy, government schemes, and technology questions. How can I assist you today?"
        : "Hello! I'm Digital Sathi AI. Please login to start chatting with me about digital literacy, government schemes, and technology questions.",
      isBot: true,
      timestamp: new Date()
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

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Check if user is authenticated
    if (!user) {
      const loginMessage = {
        id: Date.now() + 1,
        text: "Please login first to chat with Digital Sathi AI. You can login using the login button in the navbar.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loginMessage]);
      return;
    }

    setIsLoading(true);

    try {
      const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
      const prompt = `You are Digital Sathi AI, a helpful assistant for digital literacy and government schemes in India. 
      Context: You help users with digital literacy, government schemes, technology tutorials, and general guidance.
      User: ${userName}
      User question: ${inputMessage}
      
      Please provide a helpful, concise response in a friendly tone. If the question is about government schemes, provide specific details. If it's about digital literacy, give step-by-step guidance.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botResponse = response.text();

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Don't render if loading
  if (loading) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center gap-3">
            <Bot size={24} />
            <div>
              <h3 className="font-semibold">Digital Sathi AI</h3>
              <p className="text-xs opacity-90">
                {user ? `Hello, ${user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!` : 'Please login to chat'}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    <MessageContent text={message.text} />
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about digital literacy or government schemes..."
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;