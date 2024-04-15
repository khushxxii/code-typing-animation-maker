import React, { useContext } from 'react';
import { CodeContext } from './CodeContext';
import cx from 'classnames'; // Importing cx from classnames package

const Output = () => {
  const { code, inputVisible } = useContext(CodeContext);

  return (
    <div className={cx({ "w-full h-1/2 p-4 overflow-auto bg-dark": inputVisible, "w-full h-full p-4 overflow-auto bg-dark": !inputVisible })}>
      <pre className={cx("language-javascript")}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default Output;
