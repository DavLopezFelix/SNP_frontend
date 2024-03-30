import React, { useState, useEffect } from 'react';
import './ubicacioncarpeta.css';
import PopupConfirm from './pupupconfirm'; // Importa el componente PopupConfirm
import PopupSuccess from './popupsucces';

function LongitudPeso() {
  const [temporadaInfo, setTemporadaInfo] = useState(null);
  const [error, setError] = useState(null);
  const [temporadaInput, setTemporadaInput] = useState('');
  const [valorAInput, setValorAInput] = useState('');
  const [valorBInput, setValorBInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    } catch (error) {
      setError(error);
    }
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleEnviarClick = () => {
    setShowConfirmation(true);
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
    } catch (error) {
      setError(error);
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false);
  };

  const handleCloseSuccessPopup = async () => {
    setShowSuccessMessage(false);
    await fetchTemporadaInfo(); // Actualizar los datos de temporada después de cerrar el popup de éxito
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="box">
        {temporadaInfo ? (
          <div>
            <h2>Información de Temporada</h2>
            <div>
              <p>Fecha: {temporadaInfo.date}</p>
            </div>
            <div>
              <p>Temporada: {temporadaInfo.temporada}</p>
              <input
                type="text"
                value={temporadaInput}
                onChange={(e) => handleInputChange(e, setTemporadaInput)}
                placeholder="Nuevo temporada"
              />
            </div>
            <div>
              <p>Valor A: {temporadaInfo.A}</p>
              <input
                type="text"
                value={valorAInput}
                onChange={(e) => handleInputChange(e, setValorAInput)}
                placeholder="Nuevo valor A"
              />
            </div>
            <div>
              <p>Valor B: {temporadaInfo.B}</p>
              <input
                type="text"
                value={valorBInput}
                onChange={(e) => handleInputChange(e, setValorBInput)}
                placeholder="Nuevo valor B"
              />
            </div>
            <button onClick={handleEnviarClick}>Enviar</button>
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
