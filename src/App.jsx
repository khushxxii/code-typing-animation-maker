import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import cx from 'classnames'; // Importing cx from classnames package

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const index = useRef(0);
  const animationTimeout = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const animateCode = () => {
    setCode('');
    index.current = 0;
    clearTimeout(animationTimeout.current);
    typeCode();
  };

  const typeCode = () => {
    if (index.current < input.length) {
      const nextChar = input.charAt(index.current);
      setCode((prevCode) => prevCode + nextChar);
      index.current++;
      animationTimeout.current = setTimeout(typeCode, 100);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { selectionStart, selectionEnd } = textareaRef.current;
      const newText =
        input.substring(0, selectionStart) +
        '    ' +
        input.substring(selectionEnd);
      setInput(newText);
      // Move the cursor to the end of the inserted spaces
      textareaRef.current.selectionStart = selectionStart + 4;
      textareaRef.current.selectionEnd = selectionStart + 4;
    }
  };

  return (
    <div className={cx("flex flex-col h-screen w-screen")}>

      {/* INPUT AREA */}
      <div className={cx("flex flex-col w-full h-1/3 p-4 border-b border-gray-300 overflow-auto")}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your code here..."
          className={cx("flex-1 p-2 mb-4 text-black border-2 border-gray-300 rounded-md resize-none")}
          style={{ minHeight: '2rem' }}
        />
        <div className={cx("flex justify-end")}>
          <button
            onClick={animateCode}
            className={cx("px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600")}
          >
            Animate Code
          </button>
        </div>
      </div>

      {/* OUTPUT AREA */}
      <div className={cx("w-full h-2/3 p-4 overflow-auto bg-editor-bg-dark")}>
        <pre className={cx("language-javascript")}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default App;
