import { Input } from './Input';
import { FaCircleArrowUp } from 'react-icons/fa6';
import { BsPaperclip } from 'react-icons/bs';
import { TranslatorContext } from '../context/TranslatorContext';
import { useContext } from 'react';
import ButtonIcon from './ButtonIcon';

const Footer = () => {
  const { message, setMessage, isLoading, sendMessage } =
    useContext(TranslatorContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim().length < 5 || isLoading) return;
    sendMessage();
  };
  return (
    <footer className="px-3 md:px-3 py-2 max-w-3xl m-auto w-full flex justify-center">
      <form onSubmit={handleSubmit} className="flex-1">
        <Input.root>
          <ButtonIcon icon={BsPaperclip} />
          <Input.content
            type="text"
            placeholder="Pergunte algo"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <ButtonIcon
            icon={FaCircleArrowUp}
            className="text-zinc-400 disabled:text-zinc-600"
            disabled={message.length < 5}
          />
        </Input.root>
      </form>
    </footer>
  );
};

export default Footer;
