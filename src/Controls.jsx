import React, { useContext } from 'react';
import { CodeContext } from './CodeContext';
import cx from 'classnames'; // Importing cx from classnames package

const Controls = () => {
    const {
        toggleInputVisibility,
        animateCode,
        inputVisible,
        animationSpeed,
        handleSpeedChange
    } = useContext(CodeContext);

    return (
        <div className={cx("flex items-center h-12 bg-white p-4 mt-2 mb-2")}>
            <button onClick={toggleInputVisibility} className={cx("w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-white text-black hover:bg-gray-600 p-0 mr-4")}>
                {inputVisible ? (<span>⏶</span>) : (<span>⏷</span>)}
            </button>

            <div className={cx("flex justify-between flex-grow items-center")}> {/* Changed to justify-between to increase spacing */}

                {/* Animate Code Button */}
                <button onClick={animateCode} className={cx("px-4 py-2 rounded bg-gray-200 hover:bg-white text-black hover:bg-gray-600 mr-4")}>
                    Play &#9658;
                </button>

                {/* Animation Speed Controller */}
                <div className={cx("flex items-center")}> {/* Added flex items-center to vertically align the text with the slider */}
                    <span className={cx("text-black mr-2")}>Animation Speed:</span>
                    <input type="range" min="10" max="500" value={animationSpeed} onChange={handleSpeedChange} className={cx("mx-4")} />
                </div>
            </div>
        </div>
    );
};

export default Controls;
