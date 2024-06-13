import { useEffect, useRef, useContext, Fragment } from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import BotSVG from '../assets/bot.svg?react';

const ChatTranslate = () => {
  const { chats } = useContext(TranslatorContext);
  const chatRef = useRef();
  useEffect(() => {
    chatRef.current.scrollIntoView({ behavior: 'smooth' });
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    console.log('ola');
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
                className="p-3 rounded-md self-start flex gap-3 "
                key={chat.bot}
              >
                <div className="self-start border-neutral-700 border-2 p-2 rounded-full  ">
                  <BotSVG className="size-5 " />
                </div>
                <p className="leading-8">{chat.bot}</p>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </main>
  );
};

export default ChatTranslate;
