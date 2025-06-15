import Navbar from "../components/Navbar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { useState } from "react";
import toast from "react-hot-toast";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "How can I help you today?" },
  ]);
  const [document_id, setDocumentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message) => {
    if (!document_id) {
      toast.error("Please upload a PDF before chatting!");
      return;
    }
    if (isLoading) {
      toast("Assistant is still responding...");
      return;
    }
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setIsLoading(true);

    const formattedHistory = newMessages.map(
      (msg) => `${msg.role}: ${msg.content}`
    );

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document_id: document_id,
          question: message,
          chat_history: formattedHistory,
        }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar setDocumentId={setDocumentId} />
      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-7xl mx-auto sm:px-8 space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 italic ml-5">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              <span>Assistant is typing...</span>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full px-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
