import React, { useState } from 'react';

const Tooltip = ({ children, content, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  let tooltipPositionClasses;

  switch (position) {
    case 'top':
      tooltipPositionClasses =
        'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      break;
    case 'bottom':
      tooltipPositionClasses =
        'top-full left-1/2 transform -translate-x-1/2 mt-2';
      break;
    case 'left':
      tooltipPositionClasses =
        'right-full top-1/2 transform -translate-y-1/2 mr-2';
      break;
    case 'right':
      tooltipPositionClasses =
        'left-full top-1/2 transform -translate-y-1/2 ml-2';
      break;
    default:
      tooltipPositionClasses =
        'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
  }

  return (
    <div
      className="relative flex items-center z-10"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <div
          className={`absolute ${tooltipPositionClasses} bg-zinc-950 text-white text-sm px-2 py-1 rounded-md shadow-lg border-2 text-nowrap z-50`}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
