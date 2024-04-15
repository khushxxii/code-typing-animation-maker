import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import cx from 'classnames'; // Importing cx from classnames package

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [inputVisible, setInputVisible] = useState(true); // State to manage input area visibility
  const index = useRef(0);
  const animationTimeout = useRef(null);
  const textareaRef = useRef(null);

  // Title Cursor Animation
  const [cursor, setCursor] = useState("_ ");
  useEffect(() => {

    // space bar in ASCII
    const cursorInterval = setInterval(() => {
      setCursor((prevState) => prevState === "\u00a0" ? "_" : "\u00a0");
    }, 500); // Adjust cursor flashing speed here (in milliseconds)

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

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

  // Function to toggle input area visibility
  const toggleInputVisibility = () => {
    setInputVisible((prevInputVisible) => !prevInputVisible);
  };

  return (
    <div className={cx("flex flex-col h-screen w-screen bg-white p-0")}>

      {/* TITLE AREA */}
      <div className={cx("flex justify-left items-center pl-4 h-1/6 text-black text-3xl border-b")} style={{ fontFamily: 'monospace' }}>
        <b><span className={cx("text-red-500")}>Code Typing</span>{cursor}</b> &nbsp;Simulator for Demos
      </div>

      {/* INPUT AREA */}
      {inputVisible && (
        <div className={cx("flex flex-col w-full h-1/3 bg-white border-gray-300 overflow-auto")}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your code here..."
            className={cx("flex-1 p-2 text-black bg-white resize-none select-none")}
            style={{ minHeight: '2rem' }}
          />
        </div>
      )}

      {/* Buttons */}
      <div className={cx("flex items-center h-12 bg-white p-4 mt-2 mb-2")}>
        {/* First button on the left */}
        <div>
          <button
            onClick={toggleInputVisibility}
            className={cx("w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-white text-black hover:bg-gray-600 p-0")}
          >
            {inputVisible ? (<span>⏶</span>) : (<span>⏷</span>)}
          </button>
        </div>
        {/* Second button in the center */}
        {inputVisible && (<div className={cx("flex justify-center flex-grow")}>
          <button
            onClick={animateCode}
            className={cx("px-4 py-2 justify-center items-center rounded bg-gray-200 hover:bg-white text-black hover:bg-gray-600")}
          >
            Animate Code
          </button>
        </div>)}
      </div>

      {/* OUTPUT AREA */}
      {inputVisible ? (<div className={cx("w-full h-1/2 p-4 overflow-auto bg-dark")}>
        <pre className={cx("language-javascript")}>
          <code>{code}</code>
        </pre>
      </div>) : (<div className={cx("w-full h-full p-4 overflow-auto bg-dark")}>
        <pre className={cx("language-javascript")}>
          <code>{code}</code>
        </pre>
      </div>)}
    </div>
  );
};

export default App;
