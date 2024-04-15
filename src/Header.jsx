import React, { useContext } from 'react';
import { CodeContext } from './CodeContext';
import cx from 'classnames'; // Importing cx from classnames package

const Header = () => {
  const { cursor } = useContext(CodeContext);

  return (
    <div className={cx("flex justify-left items-center pl-4 h-1/6 text-black text-3xl border-b", { "font-monospace": true })}>
      <b>Codeanimate:</b>&nbsp;
      <span className={cx("text-red-500")}><i>Code Typing</i></span>{cursor}&nbsp;Simulator for Demos
    </div>
  );
};

export default Header;
