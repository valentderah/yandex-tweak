import React from 'react';

const Icon = ({ id, src, width, classes, onClick }) => (
    <img id={id} src={src} width={width} className={classes} onClick={onClick} alt={id}/>
);

export default Icon;