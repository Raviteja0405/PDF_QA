import Navbar from '../components/Navbar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'How can I help you today?' }
  ]);
  const [document_id, setDocumentId] = useState('');

  const handleSend = async (message) => {
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);

    const formattedHistory = newMessages.map(msg => `${msg.role}: ${msg.content}`);

    const res = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document_id: document_id, question: message, chat_history: formattedHistory })
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar setDocumentId={setDocumentId} />
      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-7xl mx-auto px-8 space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full px-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
