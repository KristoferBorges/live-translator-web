import React from 'react';
import MenuSVG from '../assets/menuSVG.svg?react';
import WriteSVG from '../assets/writeSVG.svg?react';
import LanguageSelect from './LanguageSelect';
import useOutsideClick from '../hooks/useOutsideClick';
import { useRef, useContext, memo } from 'react';
import ButtonIcon from './ButtonIcon';
import { TranslatorContext } from '../context/TranslatorContext';

const AsideMenuMobile = () => {
  const { menuMobile, setMenuMobile, LanguagesAvailable } =
    useContext(TranslatorContext);

  const asideRef = useRef();
  useOutsideClick(asideRef, setMenuMobile);

  if (!menuMobile) return null;
  return (
    <aside className="fixed inset-0 w-full h-full z-10 bg-zinc-950/90">
      <div
        className="fixed w-64 h-full px-4 z-20 bg-zinc-900 to-right-animation"
        ref={asideRef}
      >
        <header className="mb-10 h-14 flex justify-between items-center px-3 md:p-0">
          <ButtonIcon onClick={() => setMenuMobile(false)} icon={MenuSVG} />
          <ButtonIcon icon={WriteSVG} />
        </header>
        <LanguageSelect title={'Idioma desejado'} choice="prefer" />
        <LanguageSelect title={'Idioma destino'} choice="response" />
      </div>
    </aside>
  );
};

export default memo(AsideMenuMobile);
