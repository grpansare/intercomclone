import React, { useState } from 'react';
import { MoreHorizontal, Moon, X, Send, Zap, Paperclip, Smile, SquareStack, ChevronDown, AlertCircle, ArrowUp, Menu } from 'lucide-react';
import { motion } from "framer-motion";



export default function CustomerServiceChat() {
  const [message, setMessage] = useState('');
  const [showInbox, setShowInbox] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const inboxItems = [
    {
      id: 1,
      name: 'Luis - GitHub',
      message: 'Hey! I have a question...',
      time: '43m',
      avatar: 'L',
      avatarColor: 'bg-blue-500',
      isActive: true
    },
    {
      id: 2,
      name: 'Ivan - Nike',
      message: 'Hi there, I have a qu...',
      time: '50m',
      avatar: 'I',
      avatarColor: 'bg-red-500',
      hasAlert: true,
      alertText: 'Join'
    },
    {
      id: 3,
      name: 'Lead from New York',
      message: 'Good morning, let me...',
      time: '1h',
      avatar: 'L',
      avatarColor: 'bg-blue-500',
      unreadCount: 4
    },
    {
      id: 4,
      name: 'Booking API problems',
      message: 'Bug report',
      time: '48m',
      avatar: '🔧',
      avatarColor: 'bg-gray-600',
      subtitle: 'Luis • Small Crafts'
    },
    {
      id: 5,
      name: 'Miracle - Exemplary Bank',
      message: 'Hey there, I\'m here to...',
      time: '49m',
      avatar: 'M',
      avatarColor: 'bg-green-500'
    }
  ];

  const handleSuggestionClick = (suggestionText) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: suggestionText,
      timestamp: 'now'
    };
    
    const aiResponse = {
      id: Date.now() + 1,
      type: 'ai',
      text: `We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.

To assist you with your refund request, could you please provide your order ID and proof of purchase.

Please note:
We can only refund orders placed within the last 60 days, and your item must meet our requirements for refunds.`,
      timestamp: 'now',
      sources: [
        'Getting a refund',
        'Refund for an order placed by mistake', 
        'Refund for an unwanted gift'
      ]
    };

    setAiMessages([userMessage, aiResponse]);
    setActiveTab('ai');
    setShowAIPanel(true);
  };

 const handleAiSubmit = async () => {
  if (!aiInput.trim()) return;

  const userMessage = {
    id: Date.now(),
    type: 'user',
    text: aiInput,
    timestamp: 'now',
  };

  setAiMessages(prev => [...prev, userMessage]);
  setAiInput('');
  setIsLoading(true);

  // Simulate API call or delay
  setTimeout(() => {
    const aiReply = {
      id: Date.now() + 1,
      type: 'ai',
      text: 'This is a simulated AI response.',
      timestamp: new Date().toLocaleTimeString(),
    };

    setAiMessages(prev => [...prev, aiReply]);
    setIsLoading(false);
  }, 1500); // simulate delay of 1.5s
};


  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {(showInbox || showAIPanel) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setShowInbox(false);
            setShowAIPanel(false);
          }}
        />
      )}

      {/* Left Side - Inbox Section */}
      <div className={`
        ${showInbox ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:relative
        fixed inset-y-0 left-0 z-50 
        w-80 sm:w-96 lg:w-80 xl:w-96
        bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
      `}>
        {/* Inbox Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your inbox</h2>
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowInbox(false)}
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">6 Open</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Waiting longest</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Inbox List */}
        <div className="flex-1 overflow-y-auto">
          {inboxItems.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                item.isActive ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => {
                setShowInbox(false);
                setActiveTab('chat');
              }}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${item.avatarColor} rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}>
                  {item.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {item.hasAlert && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                          {item.alertText}
                        </span>
                      )}
                      {item.unreadCount && (
                        <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.unreadCount}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">{item.message}</p>
                  
                  {item.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle - Chat Section */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg -ml-2"
              onClick={() => setShowInbox(true)}
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate">Luis Easton</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg">
              <Moon size={20} className="text-gray-600" />
            </button>
            <button className="bg-gray-900 text-white px-2 sm:px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1">
              <X size={16} />
              <span className="hidden sm:inline">Close</span>
            </button>
            <button 
              className="xl:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowAIPanel(true)}
            >
              <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="sm:hidden bg-white border-b border-gray-200">
          <div className="flex">
            <button 
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'chat' 
                  ? 'text-blue-600 border-b-2 border-blue-500' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 ${
                activeTab === 'ai' 
                  ? 'text-blue-600 border-b-2 border-blue-500' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('ai')}
            >
              <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <span>AI Copilot</span>
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className={`flex-1 flex flex-col ${activeTab !== 'chat' ? 'hidden sm:flex' : ''}`}>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            {/* Customer Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                L
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-lg">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.
                  </p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                    <span>📎</span>
                    <span>1min</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Agent Response */}
            <div className="flex items-start space-x-3 justify-end">
              <div className="flex-1 flex justify-end min-w-0">
                <div className="bg-blue-500 text-white rounded-2xl px-4 py-3 max-w-lg">
                  <p className="text-sm leading-relaxed">
                    Let me just look into this for you, Luis.
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-blue-100">Seen • 1min</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 bg-white">
            {/* Chat Controls */}
            <div className="px-4 lg:px-6 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-white text-xs">💬</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Chat</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                  <p className="hidden sm:block text-xs text-gray-500">Use ⌘K for shortcuts</p>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="px-4 lg:px-6 py-4">
              <div className="flex items-end space-x-2 lg:space-x-3">
                {/* Left Icons */}
                <div className="hidden sm:flex items-center space-x-1 pb-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Zap size={18} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip size={18} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Input Field */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {/* Cursor line */}
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-px h-4 bg-gray-900"></div>
                  </div>
                </div>

                {/* Send Button */}
                <div className="pb-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 lg:px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors">
                    <span className="hidden sm:inline">Send</span>
                    <Send size={16} className="sm:hidden" />
                    <ChevronDown size={16} className="hidden sm:inline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile AI Copilot Content */}
        <div className={`flex-1 flex flex-col ${activeTab !== 'ai' ? 'hidden' : 'sm:hidden'}`}>
          {aiMessages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Hi, I'm Fin AI Copilot</h3>
                <p className="text-sm text-gray-500 mb-8">Ask me anything about this conversation.</p>
                
                <div className="w-16 h-16 mx-auto mb-8 text-gray-300">
                  <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
                    <path d="M32 12c-2.2 0-4 1.8-4 4v8h-4c-2.2 0-4 1.8-4 4v4h-4c-2.2 0-4 1.8-4 4v8c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V16c0-2.2-1.8-4-4-4s-4 1.8-4 4v4h-4c-2.2 0-4 1.8-4 4v4h-4v-8c0-2.2 1.8-4 4-4h4V16c0-2.2-1.8-4-4-4z" opacity="0.6"/>
                    <circle cx="16" cy="8" r="6" opacity="0.4"/>
                    <circle cx="24" cy="6" r="4" opacity="0.3"/>
                    <circle cx="32" cy="8" r="3" opacity="0.2"/>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.map((msg) => (
                <div key={msg.id} className={`flex items-start space-x-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                  {msg.type === 'ai' && (
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      AI
                    </div>
                  )}
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 order-2">
                      Y
                    </div>
                  )}
                  <div className={`flex-1 min-w-0 ${msg.type === 'user' ? 'order-1' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 max-w-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white ml-auto' 
                        : 'bg-purple-50 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                      <p className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                    {msg.sources && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">15 relevant sources found</p>
                        <div className="space-y-2">
                          {msg.sources.map((source, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-blue-600">
                              <span className="w-4 h-4 text-xs">📄</span>
                              <span>{source}</span>
                            </div>
                          ))}
                          <button className="text-sm text-blue-600 hover:underline">See all →</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white border-t border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Suggested</span>
                <Zap size={16} className="text-orange-500" />
              </div>
              <button 
                className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 px-3 py-2 rounded-lg text-sm text-left transition-colors"
                onClick={() => handleSuggestionClick('How do I get a refund?')}
              >
                How do I get a refund?
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                  placeholder="Ask a question..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={handleAiSubmit}
                >
                  <ArrowUp size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div className={`
        ${showAIPanel ? 'translate-x-0' : 'translate-x-full'} 
        xl:translate-x-0 xl:relative
        fixed inset-y-0 right-0 z-50 
        hidden sm:flex xl:flex
        w-80 xl:w-96
        bg-gray-50 border-l border-gray-200 flex-col
        transition-transform duration-300 ease-in-out
      `}>
        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-4">
          <div className="flex">
            <button className="py-3 px-4 border-b-2 border-blue-500 text-blue-600 font-medium text-sm flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <span>AI Copilot</span>
            </button>
            <button className="py-3 px-4 text-gray-500 font-medium text-sm">
              Details
            </button>
            <button 
              className="ml-auto p-2 hover:bg-gray-100 rounded xl:hidden"
              onClick={() => setShowAIPanel(false)}
            >
              <X size={16} className="text-gray-400" />
            </button>
            <button className="hidden xl:block ml-auto p-2 hover:bg-gray-100 rounded">
              <SquareStack size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* AI Copilot Content */}
        <div className="flex-1 flex flex-col">
          {aiMessages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Hi, I'm Fin AI Copilot</h3>
                <p className="text-sm text-gray-500 mb-8">Ask me anything about this conversation.</p>
                
                {/* Hand Gesture Illustration */}
<motion.div
  className="w-16 h-16 mx-auto mb-8 text-gray-300"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.5 }}
>
                  <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
                    <path d="M32 12c-2.2 0-4 1.8-4 4v8h-4c-2.2 0-4 1.8-4 4v4h-4c-2.2 0-4 1.8-4 4v8c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V16c0-2.2-1.8-4-4-4s-4 1.8-4 4v4h-4c-2.2 0-4 1.8-4 4v4h-4v-8c0-2.2 1.8-4 4-4h4V16c0-2.2-1.8-4-4-4z" opacity="0.6"/>
                    <circle cx="16" cy="8" r="6" opacity="0.4"/>
                    <circle cx="24" cy="6" r="4" opacity="0.3"/>
                    <circle cx="32" cy="8" r="3" opacity="0.2"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.map((msg) => (
<motion.div
  key={msg.id}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className={`flex items-start space-x-3 ${msg.type === 'user' ? 'justify-end' : ''}`}
>
                  {msg.type === 'ai' && (
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      AI
                    </div>
                  )}
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 order-2">
                      Y
                    </div>
                  )}
                  <div className={`flex-1 min-w-0 ${msg.type === 'user' ? 'order-1' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 max-w-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white ml-auto' 
                        : 'bg-purple-50 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                      <p className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                    {msg.sources && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">15 relevant sources found</p>
                        <div className="space-y-2">
                          {msg.sources.map((source, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-blue-600">
                              <span className="w-4 h-4 text-xs">📄</span>
                              <span>{source}</span>
                            </div>
                          ))}
                          <button className="text-sm text-blue-600 hover:underline">See all →</button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

            
{isLoading && (
  <div className="flex items-start space-x-3">
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
      AI
    </div>
    <div className="bg-purple-50 text-gray-800 px-4 py-3 rounded-2xl max-w-lg">
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
      </div>
    </div>
  </div>
)}


            </div>
          )}
        </div>

        {/* Suggested Response and Input */}
        <div className="bg-white border-t border-gray-200">
          {/* Suggested Response */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-600">Suggested</span>
              <Zap size={16} className="text-orange-500" />
            </div>
            <button 
              className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 px-3 py-2 rounded-lg text-sm text-left transition-colors"
              onClick={() => handleSuggestionClick('How do I get a refund?')}
            >
              How do I get a refund?
            </button>
          </div>

          {/* AI Input */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                placeholder="Ask a question..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={handleAiSubmit}
              >
                <ArrowUp size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}