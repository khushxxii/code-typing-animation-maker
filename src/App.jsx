import React from 'react';
import { CodeProvider } from './CodeContext';
import Header from './Header'; // Import the Header component
import Input from './Input';
import Controls from './Controls';
import Output from './Output';
import cx from 'classnames';

const App = () => {
  return (
    <CodeProvider>
      <div className={cx("flex flex-col h-screen w-screen bg-white p-0")}>
        <Header />
        <Input />
        <Controls />
        <Output />
      </div>
    </CodeProvider>
  );
};

export default App;
