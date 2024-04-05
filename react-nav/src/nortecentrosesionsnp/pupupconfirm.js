import React from 'react';

const PopupConfirm = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>{message}</p>
        <div>
          <button style={{ marginRight: '10px' }} onClick={onConfirm}>Ok</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirm;
