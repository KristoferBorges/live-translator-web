import { useEffect } from 'react';

const useOutsideClick = (ref, setState) => {
  useEffect(() => {
    const handleClick = ({ target }) => {
      if (ref.current && !ref.current.contains(target)) {
        setState(false);
      }
    };

    setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 0);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
};

export default useOutsideClick;
