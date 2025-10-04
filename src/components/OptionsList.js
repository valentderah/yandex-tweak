import React from 'react';
import Option from './Option';

const OptionsList = ({ options, onOptionChange }) => (
    <div className="options-list">
        {options.map(option => (
            <Option
                key={option.id}
                id={option.id}
                text={option.text}
                checked={option.checked}
                onOptionChange={onOptionChange}
            />
        ))}
    </div>
);

export default OptionsList;