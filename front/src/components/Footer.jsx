import { useContext, useState } from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import { Input } from './Input';
import ButtonIcon from './ButtonIcon';
import { FaCircleArrowUp } from 'react-icons/fa6';
import { FaMicrophone } from 'react-icons/fa';
import LanguageSelect from './LanguageSelect';
import Tooltip from './Tolltip';

const Footer = () => {
  const { message, setMessage, isLoading, sendMessage, langChoice } =
    useContext(TranslatorContext);
  const [listening, setListening] = useState(false);

  let recognition = null;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = langChoice.prefer.lang;
  }

  const handleMicClick = () => {
    if (recognition && !listening && !isLoading) {
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

    if (message.trim().length < 2 || isLoading) return;
    sendMessage();
    setMessage('');
  };
  return (
    <footer className="w-full max-w-4xl m-auto px-2 py-2 flex flex-col justify-center bg-neutral-900 rounded-md rounded-b-3xl">
      {/* seleção de linguagem */}
      <LanguageSelect />
      {/* campo de menssagem */}
      <form onSubmit={handleSubmit} className="flex-1">
        <Input.root>
          {recognition && (
            <Tooltip content="Reconhecimento de fala" position="right">
              <FaMicrophone
                onClick={handleMicClick}
                className={`${
                  listening ? 'text-blue-600' : 'text-neutral-300'
                } cursor-pointer`}
                size={24}
                aria-label="ENviar mensagem por voz"
              />
            </Tooltip>
          )}
          <Input.content
            type="text"
            placeholder="Pergunte algo"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <Tooltip content="Enviar mensagem" position="left">
            <ButtonIcon
              icon={FaCircleArrowUp}
              className="text-zinc-400 disabled:text-zinc-600"
              disabled={message.length < 2 || isLoading}
              size={26}
              aria-label="Enviar mensagem"
            />
          </Tooltip>
        </Input.root>
      </form>
    </footer>
  );
};

export default Footer;
