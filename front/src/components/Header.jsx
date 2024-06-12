import { useContext } from 'react';
import MenuSVG from '../assets/menuSVG.svg?react';
import WriteSVG from '../assets/writeSVG.svg?react';
import { TranslatorContext } from '../context/TranslatorContext';

const Header = () => {
  const { menu, setMenu, setMenuMobile } = useContext(TranslatorContext);
  return (
    <header className="w-full p-3 max-h-14 md:px-5">
      {/* Menu Small screen */}
      <div className="flex justify-between w-full gap-3 px-3 md:hidden">
        <button onClick={() => setMenuMobile(true)}>
          <MenuSVG />
        </button>
        <h1 className="text-2xl font-medium text-neutral-100">
          Live Translate
        </h1>
        <button>
          <WriteSVG />
        </button>
      </div>
      {/* Menu medium/large screen */}
      <div className="hidden md:flex gap-3 items-center">
        <div className="flex gap-3 data-[menu=true]:hidden" data-menu={menu}>
          <button onClick={() => setMenu(true)}>
            <MenuSVG />
          </button>
          <button>
            <WriteSVG />
          </button>
        </div>
        <h1 className="text-2xl font-medium">Live Translate</h1>
      </div>
    </header>
  );
};

export default Header;
