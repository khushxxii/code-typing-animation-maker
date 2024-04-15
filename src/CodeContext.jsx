import React, { createContext, useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Prism theme
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'; // Line numbers plugin
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; // Line numbers CSS

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [inputVisible, setInputVisible] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(100); // Represents a percentage
  const index = useRef(0);
  const animationTimeout = useRef(null);
  const textareaRef = useRef(null);

  // Cursor blinking effect
  const [cursor, setCursor] = useState("|");
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(prevState => prevState === "\u00a0" ? "|" : "\u00a0");
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Syntax highlighting with Prism
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setAnimationSpeed(Number(event.target.value));
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
      setCode(prevCode => prevCode + nextChar);
      index.current++;
      const delay = Math.max(10, 200 - 2 * animationSpeed); // Setting a minimum delay of 25ms and a maximum of 200ms
      animationTimeout.current = setTimeout(typeCode, delay);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { selectionStart, selectionEnd } = textareaRef.current;
      const newText = input.substring(0, selectionStart) + '    ' + input.substring(selectionEnd);
      setInput(newText);
      textareaRef.current.selectionStart = selectionStart + 4;
      textareaRef.current.selectionEnd = selectionStart + 4;
    }
  };

  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <CodeContext.Provider value={{
      input, setInput,
      code, setCode,
      inputVisible, toggleInputVisibility,
      animationSpeed, setAnimationSpeed,
      cursor, // Expose cursor for display in the UI
      handleInputChange, handleSpeedChange,
      animateCode,
      handleKeyDown,
      textareaRef, // Provide the ref so the Input component can use it
    }}>
      {children}
    </CodeContext.Provider>
  );
};
