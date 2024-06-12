import { useEffect } from 'react';

const useOutsideClick = (ref, setState) => {
  useEffect(() => {
    const handleClick = ({ target }) => {
      if (ref.current && !ref.current.contains(target)) {
        setState(false);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
};

export default useOutsideClick;
