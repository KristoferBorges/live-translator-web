import { useState, useContext, useRef } from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import useOutsideClick from '../hooks/useOutsideClick';
import { IoIosArrowUp } from 'react-icons/io';
import { FaExchangeAlt } from 'react-icons/fa';
import ButtonIcon from './ButtonIcon';
import LanguagesAvailable from '../services/languagesAvailable';
import { Input } from './Input';

const LanguageSelect = () => {
  const { langChoice, setLangChoice } = useContext(TranslatorContext);
  const [openSelect, setOpenSelect] = useState(false);
  const [searchLangPrefer, setSearchLangPrefer] = useState('');
  const [searchLangResponse, setSearchLangResponse] = useState('');

  const normalizeString = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const FilteredPreferLanguages = LanguagesAvailable.filter(
    (language) =>
      normalizeString(language.name).includes(
        normalizeString(searchLangPrefer)
      ) ||
      normalizeString(language.lang).includes(normalizeString(searchLangPrefer))
  );

  const FilteredResponseLanguages = LanguagesAvailable.filter(
    (language) =>
      normalizeString(language.name).includes(
        normalizeString(searchLangResponse)
      ) ||
      normalizeString(language.lang).includes(
        normalizeString(searchLangResponse)
      )
  );

  const selectRef = useRef();
  useOutsideClick(selectRef, setOpenSelect);

  const handleOpenSelect = () => {
    setOpenSelect(!openSelect);
  };

  const handleLangPrefer = (abbreviation, language) => {
    setSearchLangPrefer('');
    setLangChoice({
      ...langChoice,
      prefer: {
        lang: abbreviation,
        name: language,
      },
    });
  };

  const handleLangResponse = (abbreviation, language) => {
    setSearchLangResponse('');
    setLangChoice({
      ...langChoice,
      response: {
        lang: abbreviation,
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
            <h3 className="mb-2">Idioma de fala:</h3>
            {/* input  */}
            <div className="h-10 my-4 border-b-2 border-zinc-600 pb-2">
              <input
                type="text"
                className="px-2 rounded-md bg-zinc-800 w-full h-full focus:outline-none "
                placeholder="Pesquisar idioma de fala"
                value={searchLangPrefer}
                onChange={({ target }) => setSearchLangPrefer(target.value)}
              />
            </div>
            {/* Languages container */}
            <div className="flex flex-wrap gap-2 max-h-24 scroll-custom overflow-y-auto">
              {FilteredPreferLanguages?.map((language, index) => (
                <button
                  key={language + index}
                  className="shrink-0 basis-24 text-center text-sm bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-zinc-700 data-[select=true]:bg-zinc-600 duration-200 md:text-base md:basis-32"
                  data-select={language.lang === langChoice.prefer.lang}
                  onClick={() => handleLangPrefer(language.lang, language.name)}
                  aria-label={`selecionar linguagem ${language.name}`}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
          {/* Button to change between two languages */}
          <ButtonIcon
            icon={FaExchangeAlt}
            className="bg-zinc-400 text-zinc-900 rounded-md py-2 px-7 self-center uppercase font-medium my-1 md:my-4"
            size={20}
            onClick={handleInvertLanguage}
            aria-label="inverter linguagens"
          />
          <div>
            <h3 className="mb-2">Idioma de tradução:</h3>
            {/* Input  */}
            <div className="h-10 my-4 border-b-2 border-zinc-600 pb-2">
              <input
                type="text"
                className="px-2 rounded-md bg-zinc-800 w-full h-full focus:outline-none"
                placeholder="Pesquisar idioma de tradução"
                value={searchLangResponse}
                onChange={({ target }) => setSearchLangResponse(target.value)}
              />
            </div>

            {/* Languages container */}
            <div className="flex flex-wrap gap-2 max-h-24 scroll-custom overflow-y-auto">
              {FilteredResponseLanguages?.map((language, index) => (
                <button
                  key={language + index}
                  className="shrink-0 basis-24  text-center text-sm bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-zinc-700 data-[select=true]:bg-zinc-600 duration-200 md:text-base md:basis-32"
                  data-select={language.lang === langChoice.response.lang}
                  onClick={() =>
                    handleLangResponse(language.lang, language.name)
                  }
                  aria-label={`selecionar linguagem ${language.name}`}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* END language select menu */}

      {/* Languages Display */}
      <div
        className="flex items-center justify-between relative z-0 hover:bg-neutral-800 rounded-md p-2  cursor-pointer"
        onClick={handleOpenSelect}
        aria-expanded={openSelect}
      >
        <div>
          <h3 className="font-bold text-sm md:text-base">Idioma de fala:</h3>
          <span className="text-xs md:text-sm">{langChoice.prefer.name}</span>
        </div>
        <IoIosArrowUp
          size={24}
          className="data-[rotate=true]:rotate-180 duration-200 self-start ml-2 absolute -top-5 left-1/2 -translate-x-1/2 bg-neutral-700 rounded-full p-1"
          data-rotate={openSelect}
        />
        <div>
          <h3 className="font-bold text-sm md:text-base">
            Idioma de tradução:
          </h3>
          <span className="text-xs md:text-sm">{langChoice.response.name}</span>
        </div>
      </div>
    </article>
  );
};

export default LanguageSelect;
