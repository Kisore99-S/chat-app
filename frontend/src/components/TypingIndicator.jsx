const TypingIndicator = () => {
  return (
    <div className="chat chat-start ml-6">
      <div className="flex items-center space-x-1">
        <span className="w-2 h-2 rounded-full bg-gray-500 animate-[bounce_1s_ease-in-out_infinite]" />
        <span className="w-2 h-2 rounded-full bg-gray-500 animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
        <span className="w-2 h-2 rounded-full bg-gray-500 animate-[bounce_1s_ease-in-out_infinite_0.4s]" />
      </div>
    </div>
  );
};

export default TypingIndicator;
