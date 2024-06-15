import { createContext, useState, useEffect, useMemo } from 'react';
import { AUDIO_GET, TEXT_POST } from '../services/api';
import axios from 'axios';

const TranslatorContext = createContext();

const TranslatorProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [langChoice, setLangChoice] = useState({
    prefer: 'pt-br',
    response: 'en-us',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const LanguagesAvailable = useMemo(() => [
    {
      lang: 'pt-br',
      name: 'Português',
    },
    {
      lang: 'en-us',
      name: 'Ingles',
    },
    {
      lang: 'es-ES',
      name: 'Espanhol',
    },
    {
      lang: 'ja',
      name: 'Japones',
    },
    {
      lang: 'ko',
      name: 'Coreano',
    },
    {
      lang: 'ar',
      name: 'Arabe',
    },
    {
      lang: 'ru',
      name: 'Russo',
    },
    {
      lang: 'de',
      name: 'Alemão',
    },
  ]);

  const sendMessage = async (transcript) => {
    try {
      setIsLoading(true);

      const { url, content } = TEXT_POST({
        prefer: langChoice.prefer,
        response: langChoice.response,
        text: transcript ? transcript : message,
      });

      setChats((prev) => [...prev, { me: transcript ? transcript : message }]);

      const response = await axios.post(url, content);
      if (!response === '200') throw new Error('Mensagem não enviada');
      await getAudio();
      const { translated_text } = response.data;

      setChats((prev) => [...prev, { bot: translated_text }]);
    } catch (err) {
      setChats((prev) => [...prev, { bot: `${err}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAudio = async () => {
    const { url } = AUDIO_GET();
    const response = await fetch(url);
    const blob = await response.blob();

    const urlAudio = URL.createObjectURL(blob);
    setAudioUrl(urlAudio);
  };

  useEffect(() => {
    window.addEventListener('resize', ({ target }) => {
      if (target.innerWidth > 768) {
        setMenuMobile(false);
      }
      if (target.innerWidth < 768) {
        setMenu(false);
      }
    });
  }, []);

  return (
    <TranslatorContext.Provider
      value={{
        menu,
        setMenu,
        menuMobile,
        setMenuMobile,
        message,
        setMessage,
        langChoice,
        setLangChoice,
        LanguagesAvailable,
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
