import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const codeInput = `
  while (True) {
    return 0;
  }
`;

const App = () => {
  const [code, setCode] = useState('');
  const index = useRef(0);

  useEffect(() => {
    if (index.current < codeInput.length) {
      setTimeout(() => {
        setCode((code) => code + codeInput.charAt(index.current));
        index.current++;
      }, 50); // Set the typing speed here
    }
  }, [code]);

  return (
    <div className="App">
      <div className="editor">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};

export default App;
