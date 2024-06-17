import { useState, useContext, useRef } from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import useOutsideClick from '../hooks/useOutsideClick';
import { FaExchangeAlt } from 'react-icons/fa';
import ButtonIcon from './ButtonIcon';
import { IoIosArrowUp } from 'react-icons/io';

const LanguageSelect = () => {
  const { LanguagesAvailable, langChoice, setLangChoice } =
    useContext(TranslatorContext);
  const [openSelect, setOpenSelect] = useState(false);

  const selectRef = useRef();
  useOutsideClick(selectRef, setOpenSelect);

  const handleOpenSelect = () => {
    setOpenSelect(!openSelect);
  };

  const handleLangPrefer = (abreviation, language) => {
    setLangChoice({
      ...langChoice,
      prefer: {
        lang: abreviation,
        name: language,
      },
    });
  };

  const handleLangResponse = (abreviation, language) => {
    setLangChoice({
      ...langChoice,
      response: {
        lang: abreviation,
        name: language,
      },
    });
  };

  const handleInvertLanguage = () => {
    const languagePrefer = langChoice.prefer;
    const languageResponse = langChoice.response;
    setLangChoice({
      prefer: {
        lang: languageResponse.lang,
        name: languageResponse.name,
      },
      response: {
        lang: languagePrefer.lang,
        name: languagePrefer.name,
      },
    });
  };
  return (
    <article className="flex-1 justify-between relative mb-2" ref={selectRef}>
      {/* language select menu */}
      {openSelect && (
        <div
          className="absolute w-full left-0 bottom-20 flex flex-col gap-3 bg-zinc-900 rounded-md p-3 mb-1 z-10"
          aria-hidden={!openSelect}
        >
          <div>
            <h2 className="mb-2">Idioma de fala:</h2>
            <div className="flex flex-wrap gap-2">
              {LanguagesAvailable?.map((language) => (
                <span
                  key={language + Math.random()}
                  className="bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-zinc-700 data-[select=true]:bg-zinc-600 duration-200"
                  data-select={language.lang === langChoice.prefer.lang}
                  onClick={() => handleLangPrefer(language.lang, language.name)}
                >
                  {language.name}
                </span>
              ))}
            </div>
          </div>
          <ButtonIcon
            icon={FaExchangeAlt}
            className="bg-zinc-400 text-zinc-900 rounded-md py-2 px-7 self-center uppercase font-medium my-4"
            size={20}
            onClick={handleInvertLanguage}
            aria-label="inverter linguagens"
          />
          <div>
            <h2 className="mb-2">Idioma de tradução:</h2>
            <div className="flex flex-wrap gap-2">
              {LanguagesAvailable?.map((language) => (
                <span
                  key={language + Math.random()}
                  className="bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-zinc-700 data-[select=true]:bg-zinc-600 duration-200"
                  data-select={language.lang === langChoice.response.lang}
                  onClick={() =>
                    handleLangResponse(language.lang, language.name)
                  }
                >
                  {language.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* END language select menu */}

      {/* Languages*/}
      <button
        className="flex items-center justify-between w-full relative z-0 hover:bg-neutral-800 rounded-md p-2 cursor-pointer"
        onClick={handleOpenSelect}
        aria-expanded={openSelect}
      >
        <div>
          <h2 className="font-bold text-sm md:text-base">Idioma de fala:</h2>
          <span className="text-xs md:text-sm">{langChoice.prefer.name}</span>
        </div>
        <IoIosArrowUp
          size={24}
          className="data-[rotate=true]:rotate-180 duration-200 self-start ml-2 absolute -top-5 left-1/2 -translate-x-1/2 bg-neutral-700 rounded-full p-1"
          data-rotate={openSelect}
        />
        <div>
          <h2 className="font-bold text-sm md:text-base">
            Idioma de tradução:
          </h2>
          <span className="text-xs md:text-sm">{langChoice.response.name}</span>
        </div>
      </button>
    </article>
  );
};

export default LanguageSelect;
