import { useCallback, useContext, useState } from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import { Input } from './Input';
import ButtonIcon from './ButtonIcon';
import { FaCircleArrowUp } from 'react-icons/fa6';
import { FaMicrophone } from 'react-icons/fa';

const Footer = () => {
  const { message, setMessage, isLoading, sendMessage, langChoice } =
    useContext(TranslatorContext);
  const [listening, setListening] = useState(false);

  let recognition = null;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = langChoice.prefer;
  }

  const handleMicClick = () => {
    if (recognition && !listening) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        if (transcript.length > 3) sendMessage(transcript);
      };

      recognition.onerror = (e) => {
        console.error('Recognition error:', e.error);
        setListening(false);
      };

      recognition.start();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (message.trim().length < 3 || isLoading) return;
    sendMessage();
    setMessage('');
  };
  return (
    <footer className="px-3 md:px-3 py-2 max-w-3xl m-auto w-full flex justify-center">
      <form onSubmit={handleSubmit} className="flex-1">
        <Input.root>
          {recognition && (
            <FaMicrophone
              onClick={handleMicClick}
              className={`${listening ? 'text-blue-600' : 'text-neutral-300'}`}
              size={24}
            />
          )}
          <Input.content
            type="text"
            placeholder="Pergunte algo"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <ButtonIcon
            icon={FaCircleArrowUp}
            className="text-zinc-400 disabled:text-zinc-600"
            disabled={message.length < 3 || isLoading}
            aria-label="Enviar mensagem"
          />
        </Input.root>
      </form>
    </footer>
  );
};

export default Footer;
