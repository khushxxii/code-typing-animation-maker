import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import './App.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const App = () => {
  const [code, setCode] = useState(''); // For displayed code
  const [input, setInput] = useState(''); // User input
  const index = useRef(0); // Current index in the input string
  const animationTimeout = useRef(null); // To handle animation timeout

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const animateCode = () => {
    setCode(''); // Clear existing code
    index.current = 0; // Reset index to start typing from the beginning
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current); // Clear previous animation
    }
    typeCode(); // Start typing animation
  };

  const typeCode = () => {
    if (index.current < input.length) {
      const nextChar = input.charAt(index.current);
      setCode(prevCode => prevCode + nextChar); // Append next character
      index.current++; // Move to next character
      animationTimeout.current = setTimeout(typeCode, 100); // Schedule next character
    }
  };

  return (
    <div className="App">
      <div className="input-area">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your code here..."
          className="code-input"
        />
        <button onClick={animateCode} className="refresh-button">
          Animate Code
        </button>
      </div>
      <div className="editor">
        <pre className="line-numbers language-javascript">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default App;
