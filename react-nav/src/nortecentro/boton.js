// Boton.js
import React from 'react';
import '../nortecentro/boton.css';

const Boton = ({ children, onClick, color, textColor }) => {
  const botonStyle = {
    backgroundColor: color,
    color: textColor
  };

  return (
    <button className="boton" style={botonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Boton;

