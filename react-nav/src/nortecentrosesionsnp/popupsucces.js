// PopupSuccess.js
import React from 'react';

const PopupSuccess = ({ message, onClose }) => {
  return (
    <div className="popup-container">
    <div className="popup">
        <div className="success-message">
          <p>{message}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default PopupSuccess;
