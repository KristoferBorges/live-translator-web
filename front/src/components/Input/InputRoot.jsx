import React from 'react';

const InputRoot = ({ children }) => {
  return (
    <div className="w-full bg-neutral-700/50 px-4 overflow-hidden rounded-3xl flex items-center justify-between gap-2">
      {children}
    </div>
  );
};

export default InputRoot;
