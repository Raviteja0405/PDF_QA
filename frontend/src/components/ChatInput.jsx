import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSend(input);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-inner"
    >
      <div className="flex items-center w-full max-w-6xl mx-auto my-8 bg-[#F9FAFB] border border-[#E4E8EE] rounded-lg px-4 py-3 shadow-sm">
        <input
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none px-2 text-sm"
        />
        <button type="submit" className="ml-2 text-gray-500 hover:text-black">
          <FiSend size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
