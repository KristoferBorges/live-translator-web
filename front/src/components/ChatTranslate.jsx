import {
  useEffect,
  useRef,
  useContext,
  Fragment,
  useState,
  useCallback,
} from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import BotSVG from '../assets/bot.svg?react';
import { FaPlay, FaPause } from 'react-icons/fa';

const ChatTranslate = () => {
  const { chats, audioUrl } = useContext(TranslatorContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const chatRef = useRef();
  const audioRef = useRef();

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    chatRef.current.scrollIntoView({ behavior: 'smooth' });
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chats]);

  return (
    <main className="px-3 overflow-y-auto scroll-custom flex-1" ref={chatRef}>
      <div className="w-full min-h-full flex-1 max-w-3xl m-auto flex flex-col gap-2 md:px-3 justify-end">
        {chats?.map((chat, index) => (
          <Fragment key={index}>
            {chat.me && (
              <div
                className="self-end px-5 py-2 rounded-full bg-neutral-700"
                key={chat.me}
              >
                <p>{chat.me}</p>
              </div>
            )}

            {chat.bot && (
              <div
                className="p-3 rounded-md self-start flex gap-3 items-center"
                key={chat.bot}
              >
                <div className="self-start">
                  <BotSVG className="size-7" />
                </div>
                <p className="leading-8">{chat.bot}</p>
                {index === chats.length - 1 && (
                  <span className="p-2 bg-neutral-700 rounded-full cursor-pointer hover:bg-neutral-600">
                    {isPlaying ? (
                      <FaPause size={10} onClick={handlePause} />
                    ) : (
                      <FaPlay size={10} onClick={handlePlay} />
                    )}
                  </span>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
      {audioUrl && (
        <audio src={audioUrl} ref={audioRef} onEnded={handlePause}></audio>
      )}
    </main>
  );
};

export default ChatTranslate;
