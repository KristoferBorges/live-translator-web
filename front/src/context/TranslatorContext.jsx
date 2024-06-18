import { createContext, useState, useMemo } from 'react';
import { AUDIO_GET, TEXT_POST } from '../services/api';
import axios from 'axios';

const TranslatorContext = createContext();

const TranslatorProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [langChoice, setLangChoice] = useState({
    prefer: {
      lang: 'pt-br',
      name: 'Português',
    },
    response: {
      lang: 'en-us',
      name: 'Ingles',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const sendMessage = async (transcript) => {
    try {
      // get message from microphone or not
      const menssageText = transcript ? transcript : message;

      //use function from services/api.js
      const { url, content } = TEXT_POST({
        prefer: langChoice.prefer.lang,
        response: langChoice.response.lang,
        text: menssageText,
      });
      const { url: urlAudio, options } = AUDIO_GET();

      setIsLoading(true);
      setChats((prev) => [...prev, { me: menssageText }]);

      const [textResponse, audioResponse] = await Promise.all([
        axios.post(url, content),
        fetch(urlAudio, options),
      ]);
      const audioBlob = await audioResponse.blob();

      const { translated_text } = textResponse.data;
      const URLBlobAudio = URL.createObjectURL(audioBlob);
      setAudioUrl(URLBlobAudio);

      setChats((prev) => [...prev, { bot: translated_text }]);
    } catch (err) {
      setChats((prev) => [...prev, { bot: `${err}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TranslatorContext.Provider
      value={{
        message,
        setMessage,
        langChoice,
        setLangChoice,
        chats,
        setChats,
        isLoading,
        setIsLoading,
        sendMessage,
        audioUrl,
      }}
    >
      {children}
    </TranslatorContext.Provider>
  );
};

export { TranslatorContext, TranslatorProvider };
