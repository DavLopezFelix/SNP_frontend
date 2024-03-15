import React from 'react';
import '../nortecentro/boton.css'; // Asegúrate de que el archivo CSS esté correctamente vinculado

// Componente de botón reutilizable
const Boton = ({ onClick, color, children }) => (
  <button 
    className="boton" 
    style={{ backgroundColor: color, color: color === 'white' ? 'black' : 'white' }} 
    onClick={onClick}
  >
    {children}
  </button>
);

export default Boton;

