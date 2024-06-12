import AsideMenu from './components/AsideMenu';
import ChatTranslate from './components/ChatTranslate';
import Header from './components/Header';
import AsideMenuMobile from './components/AsideMenuMobile';
import Footer from './components/Footer';
import { TranslatorProvider } from './context/TranslatorContext';
function App() {
  return (
    <>
      <TranslatorProvider>
        <div className="bg-neutral-800 h-dvh flex text-neutral-300">
          <AsideMenu />
          <AsideMenuMobile />
          <div className="min-h-full flex-1 flex flex-col gap-3">
            <Header />
            <ChatTranslate />
            <Footer />
          </div>
        </div>
      </TranslatorProvider>
    </>
  );
}

export default App;
