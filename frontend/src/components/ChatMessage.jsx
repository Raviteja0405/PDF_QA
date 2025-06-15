import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ role, content }) => {
  const profileImage = role === 'user' ? '/profile-user.png' : '/profile-ai.png';

  return (
    <div className="flex items-start max-w-full sm:max-w-[80%] px-4">
      <img
        src={profileImage}
        alt="Profile"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mr-1 mt-1"
      />
      <div className="px-3 sm:px-5 py-2 sm:py-3 rounded-xl shadow-sm bg-white text-black break-words text-sm sm:text-base">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
