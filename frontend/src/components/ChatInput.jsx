import { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-white border-t">
      <input
        type="text"
        placeholder="Send a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border-[#E4E8EE] rounded px-4 py-2 mr-2 focus:outline-none"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        ➤
      </button>
    </form>
  );
};

export default ChatInput;
