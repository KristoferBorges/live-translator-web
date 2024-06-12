import { createContext, useState, useEffect } from 'react';
import { TEXT_POST } from '../services/api';

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
  const [erro, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const LanguagesAvailable = [
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
  ];

  const sendMessage = async () => {
    try {
      setIsLoading(true);
      const { url, options } = TEXT_POST({
        prefer: langChoice.prefer,
        response: langChoice.response,
        text: message,
      });

      setChats((prev) => [...prev, { me: message }]);

      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Mensagem não enviada');
      const { translated_text } = await response.json();

      setChats((prev) => [...prev, { bot: `${translated_text}` }]);
    } catch (err) {
      setChats((prev) => [...prev, { bot: `${err}` }]);
    } finally {
      setIsLoading(false);
    }
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
        erro,
        setErro,
      }}
    >
      {children}
    </TranslatorContext.Provider>
  );
};

export { TranslatorContext, TranslatorProvider };
