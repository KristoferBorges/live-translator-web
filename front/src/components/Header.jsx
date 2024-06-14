import { useContext } from 'react';
import MenuSVG from '../assets/menuSVG.svg?react';
import { TranslatorContext } from '../context/TranslatorContext';

const Header = () => {
  const { menu, setMenu, setMenuMobile } = useContext(TranslatorContext);
  return (
    <header className="w-full p-3 max-h-14">
      <div className="flex items-center w-full gap-3 px-3">
        {/* Menu Small screen */}
        <button
          onClick={() => setMenuMobile(true)}
          className="md:hidden"
          aria-label="Abrir menu"
        >
          <MenuSVG />
        </button>
        {/* Menu medium/large screen */}
        <button
          onClick={() => setMenu(true)}
          className="hidden data-[menu=true]:hidden md:flex"
          aria-label="Abrir menu"
          data-menu={menu}
        >
          <MenuSVG />
        </button>
        <h1 className="text-2xl text-center font-medium text-neutral-300 flex-1">
          Chat Translate
        </h1>
      </div>
    </header>
  );
};

export default Header;
