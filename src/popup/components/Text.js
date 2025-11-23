import React from 'react';

const Text = ({id, text, classes, ...props}) => (
    <div id={id} className={`text ${classes}`} {...props}>{text}</div>
);

export default Text;