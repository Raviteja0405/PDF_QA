const ChatMessage = ({ role, content }) => {
  const profileImage = role === 'user' ? '/profile-user.png' : '/profile-ai.png';

  return (
    <div className="flex items-center justify-start ">
      <img
        src={profileImage}
        alt="Profile"
        className="w-8 h-8 rounded-full mr-3"
      />
      <div className="px-5 py-3 rounded-xl shadow-sm bg-white text-black">
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
