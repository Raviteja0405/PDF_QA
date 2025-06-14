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

    const res = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message, chat_history: newMessages })
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-6xl mx-auto px-8 space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto w-full px-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
