import LanguageSelect from './LanguageSelect';
import MenuSVG from '../assets/menuSVG.svg?react';
import { useContext } from 'react';
import { TranslatorContext } from '../context/TranslatorContext';
import ButtonIcon from './ButtonIcon';

const AsideMenu = () => {
  const { menu, setMenu, LanguagesAvailable, langChoice, setLangChoice } =
    useContext(TranslatorContext);
  return (
    <aside
      className="bg-neutral-900 transition-[flex-basis_padding] duration-100 ease-in-out basis-0 overflow-y-auto scroll-custom data-[menu=true]:basis-64 data-[menu=true]:px-4 "
      data-menu={menu}
    >
      <div data-menu={menu} className="flex flex-col">
        <header className="mb-10 h-14 flex justify-between items-center px-3 md:p-0">
          <ButtonIcon onClick={() => setMenu(!menu)} icon={MenuSVG} />
        </header>
        <LanguageSelect title={'Idioma desejado'} choice="prefer" />
        <LanguageSelect title={'Idioma destino'} choice="response" />
      </div>
    </aside>
  );
};

export default AsideMenu;
