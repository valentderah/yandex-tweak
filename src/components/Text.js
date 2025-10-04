import React from 'react';

const Text = ({ id, text, classes }) => (
    <div id={id} className={`text ${classes}`}>{text}</div>
);

export default Text;