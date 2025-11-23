import React from 'react';

const Option = ({id, text, checked, onOptionChange}) => (
    <div className="option">
        <label className="checkbox">
            <span className="checkmark"></span>
            <input
                type="checkbox"
                className="input-checkbox"
                id={id}
                checked={checked}
                onChange={() => onOptionChange(id)}
            />
            {text}
        </label>
    </div>
);

export default Option;