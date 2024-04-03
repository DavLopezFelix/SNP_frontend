import React, { useState, useEffect } from 'react';
import './ubicacioncarpeta.css';
import './longitudpeso.css'; // Importa el archivo de estilos CSS para LongitudPeso
import PopupConfirm from './pupupconfirm'; // Importa el componente PopupConfirm
import PopupSuccess from './popupsucces';
import './longitudpeso.css';

function LongitudPeso() {
  const [temporadaInfo, setTemporadaInfo] = useState(null);
  const [error, setError] = useState(null);
  const [temporadaInput, setTemporadaInput] = useState('');
  const [valorAInput, setValorAInput] = useState('');
  const [valorBInput, setValorBInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showEditMessage, setShowEditMessage] = useState(false);

  useEffect(() => {
    fetchTemporadaInfo();
  }, []);

  const fetchTemporadaInfo = async () => {
    try {
      const response = await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/lastTemporada', {
        headers: {
          'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTemporadaInfo(data);
      setValorAInput(data.A.toString()); // Asignar valor inicial de A
      setValorBInput(data.B.toString()); // Asignar valor inicial de B
    } catch (error) {
      setError(error);
    }
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
    setShowErrorMessage(false);
    setShowEditMessage(false);
  };

  const handleEnviarClick = () => {
    if (temporadaInput.trim() !== '' && valorAInput.trim() !== '' && valorBInput.trim() !== '') {
      setShowConfirmation(true);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleEditarClick = () => {
    if (temporadaInput.trim() !== '') {
      setShowEditMessage(true);
    } else {
      // Permitir editar los valores de A y B
      setValorAInput(temporadaInfo.A.toString());
      setValorBInput(temporadaInfo.B.toString());
    }
  };

  const handleConfirmOk = async () => {
    setShowConfirmation(false);

    try {
      const response = await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/lastTemporada', {
        method: 'POST',
        headers: {
          'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          temporada: temporadaInput || temporadaInfo.temporada,
          A: valorAInput || temporadaInfo.A,
          B: valorBInput || temporadaInfo.B
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTemporadaInfo(data);
      setShowSuccessMessage(true);
      setTemporadaInput('');
      setValorAInput('');
      setValorBInput('');
    } catch (error) {
      setError(error);
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false);
  };

  const handleCloseSuccessPopup = async () => {
    setShowSuccessMessage(false);
    await fetchTemporadaInfo();
    setTemporadaInput('');
    setValorAInput('');
    setValorBInput('');
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <div className="box" style={{ width: '50%', margin: 'auto', padding: '20px' }}>
        {temporadaInfo ? (
          <div>
            <h2>Información de Temporada</h2>
            <div>
              <p>Fecha: {temporadaInfo.date}</p>
            </div>
            <div>
              <p>{temporadaInfo.temporada}</p>
              <input
                type="text"
                value={temporadaInput}
                onChange={(e) => handleInputChange(e, setTemporadaInput)}
                placeholder="Nuevo temporada"
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <p>a: {temporadaInfo.A}</p>
              <input
                type="text"
                value={valorAInput}
                onChange={(e) => handleInputChange(e, setValorAInput)}
                placeholder="Nuevo valor A"
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <p>b: {temporadaInfo.B}</p>
              <input
                type="text"
                value={valorBInput}
                onChange={(e) => handleInputChange(e, setValorBInput)}
                placeholder="Nuevo valor B"
                style={{ fontSize: '14px' }}
              />
            </div>
            <button 
              className="button-primary" 
              onClick={handleEnviarClick}
            >
              Enviar
            </button>
            <button 
              className="button-primary" 
              onClick={handleEditarClick}
            >
              Editar a y b
            </button>
            {showErrorMessage && <div className="error-message">Falta completar los datos.</div>}
            {showEditMessage && <div className="error-message">Solo se puede editar los datos de a y b.</div>}
            {showConfirmation && (
              <PopupConfirm
                message="¿Está seguro que este es el nombre que quiere ponerle a la temporada?"
                onConfirm={handleConfirmOk}
                onCancel={handleConfirmCancel}
              />
            )}
            {showSuccessMessage && (
              <PopupSuccess
                message="Datos enviados con éxito"
                onClose={handleCloseSuccessPopup}
              />
            )}
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </div>
  );
}

export default LongitudPeso;
