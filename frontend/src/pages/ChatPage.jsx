import Navbar from '../components/Navbar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'How can I help you today?' }
  ]);

  const handleSend = async (message) => {
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);

    // Make API call here using fetch/axios from utils/api.js
    const res = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message, chat_history: newMessages })
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
