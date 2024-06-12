import { useContext } from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import { useCallback } from 'react';

const LanguageSelect = ({ title, choice }) => {
  const { langChoice, setLangChoice, LanguagesAvailable } =
    useContext(TranslatorContext);

  const handleClick = useCallback(
    (language) => {
      setLangChoice({ ...langChoice, [choice]: language });
    },
    [langChoice]
  );

  return (
    <article className="mb-5 ">
      <h2 className="mb-3 text-lg font-medium text-nowrap">{title}:</h2>

      <ul className="text-sm px-2 py-2 flex flex-col gap-2 h-36 overflow-y-auto overflow-x-hidden scroll-custom">
        {LanguagesAvailable?.map(({ lang, name }) => (
          <li
            key={name}
            data-select={lang === langChoice[choice]}
            className="px-3 py-2  hover:bg-neutral-700 cursor-pointer rounded-md data-[select=true]:bg-neutral-700"
            onClick={() => handleClick(lang)}
          >
            <button>{name}</button>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default LanguageSelect;
