const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#121212]">
      <div className="max-w-md text-center space-y-6">
        <h2 className="text-2xl font-bold">Welcome to TalkSpace</h2>
        <p className="text-base-content/60">
          This space needs some text. Open a chat!
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
