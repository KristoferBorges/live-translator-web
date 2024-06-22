import { createContext, useState, useEffect } from 'react';
import { AUDIO_GET, TEXT_POST } from '../services/api';
import axios from 'axios';

const TranslatorContext = createContext();

const TranslatorProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const sendMessage = async (transcript) => {
    try {
      // get message from microphone or not
      const menssageText = transcript ? transcript : message;
      const ID = Math.floor(Math.random() * 10_000);

      //use function from services/api.js
      const { optionsText } = TEXT_POST({
        prefer: langChoice.prefer.lang,
        response: langChoice.response.lang,
        text: menssageText,
        id: ID,
      });
      const { url: urlAudio, options } = AUDIO_GET(ID);

      setIsLoading(true);
      setAudioUrl(null);
      setChats((prev) => [...prev, { me: menssageText }]);

      const [textResponse, audioResponse] = await Promise.all([
        axios(optionsText),
        fetch(urlAudio, options),
      ]);
      const audioBlob = await audioResponse.blob();

      const { translated_text } = textResponse.data;
      const URLblobAudio = URL.createObjectURL(audioBlob);

      setAudioUrl(URLblobAudio);
      setChats((prev) => [...prev, { bot: translated_text }]);
      //set langChoice to local Storage for persistence data
      localStorage.setItem('Languages', JSON.stringify(langChoice));

      //set isPlaying to true if transcript is not null
      if (transcript) setIsPlaying(true);
    } catch (err) {
      setChats((prev) => [...prev, { bot: `${err}` }]);
      console.error('Erro na requisição:', err);
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
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </TranslatorContext.Provider>
  );
};

export { TranslatorContext, TranslatorProvider };
