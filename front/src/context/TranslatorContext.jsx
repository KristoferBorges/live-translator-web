import { createContext, useState, useEffect } from 'react';
import { AUDIO_GET, TEXT_POST } from '../services/api';
import axios from 'axios';

const TranslatorContext = createContext();

const TranslatorProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [langChoice, setLangChoice] = useState({
    prefer: {
      lang: 'pt',
      name: 'Português',
    },
    response: {
      lang: 'en',
      name: 'Inglês',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const sendMessage = async (transcript) => {
    try {
      // get message from microphone or not
      const menssageText = transcript ? transcript : message;
      const ID = Math.floor(Math.random() * 10_000);

      //use function from services/api.js
      const { optionsJSON } = TEXT_POST({
        prefer: langChoice.prefer.lang,
        response: langChoice.response.lang,
        text: menssageText,
        id: ID,
      });
      const { optionsAudio } = AUDIO_GET(ID);

      setIsLoading(true);
      setAudioUrl(null);
      setChats((prev) => [...prev, { me: menssageText }]);

      const [textResponse, audioResponse] = await Promise.all([
        axios(optionsJSON),
        axios(optionsAudio),
      ]);
      const { translated_text } = textResponse.data;
      const URLblobAudio = URL.createObjectURL(audioResponse.data);

      setAudioUrl(URLblobAudio);
      setChats((prev) => [...prev, { bot: translated_text }]);
      //set langChoice to local Storage for persistence data
      localStorage.setItem('Languages', JSON.stringify(langChoice));
    } catch (err) {
      setChats((prev) => [...prev, { bot: `${err}` }]);
      console.error(audioResponse);
    } finally {
      setIsLoading(false);
    }
  };

  //get local storage and put on langChoice
  useEffect(() => {
    const langStorage = localStorage.getItem('Languages');
    if (langStorage) {
      setLangChoice(JSON.parse(langStorage));
    }
  }, []);

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
