import React, { useContext } from 'react';
import { CodeContext } from './CodeContext';
import cx from 'classnames';

const Input = () => {
  const { input, handleInputChange, onKeyDown, inputVisible } = useContext(CodeContext);

  if (!inputVisible) return null; // This line hides the component when inputVisible is false

  return (
    <div className={cx("flex flex-col w-full h-1/3 bg-white border-gray-300 overflow-auto pl-4")}>
      <textarea
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Paste your code here..."
        className={cx("flex-1 p-2 text-black bg-white resize-none select-none")}
        style={{ minHeight: '2rem', outline: 'none', border: 'none' }}
      />
    </div>
  );
};

export default Input;
