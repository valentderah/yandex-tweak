import React from 'react';

const Button = ({ id, text, onClick }) => (
    <button id={id} onClick={onClick}>{text}</button>
);

export default Button;