import React, { useState, useEffect } from 'react';
import PopupConfirm from './pupupconfirm';
import PopupSuccess from './popupsucces';
import PopupMessage from './popupmessage';

function LongitudPeso() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [temporadaInput, setTemporadaInput] = useState('');
  const [aInput, setAInput] = useState('');
  const [bInput, setBInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [temporadaToConfirm, setTemporadaToConfirm] = useState('');
  const [showEditMessage, setShowEditMessage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/lastTemporada', {
        headers: {
          'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!temporadaInput || !aInput || !bInput) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }

    setTemporadaToConfirm(temporadaInput);
    setShowPopup(true);
  };

  const handleEditDecision = async () => {
    if (!aInput || !bInput || temporadaInput) {
      setErrorMessage('Por favor, Inserte solo los valores de A y B.');
      return;
    }
    handleEdit();
  };

  const handleConfirm = async () => {
    try {
      await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/lastTemporada', {
        method: 'POST',
        headers: {
          'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          temporada: temporadaInput,
          A: parseFloat(aInput),
          B: parseFloat(bInput)
        })
      });

      // Refetch data to update UI after submission
      fetchData();

      // Clear input fields and error message
      setTemporadaInput('');
      setAInput('');
      setBInput('');
      setErrorMessage('');
      setShowPopup(false);
      setShowSuccessMessage(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessMessage(false);
  };

  const handleEdit = async () => {
    try {
      await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/aybVariables', {
        method: 'POST',
        headers: {
          'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          A: parseFloat(aInput),
          B: parseFloat(bInput)
        })
      });

      setShowEditMessage(true);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseEditMessage = () => {
    setShowEditMessage(false);
    // Clear input fields and call fetchData again
    setTemporadaInput('');
    setAInput('');
    setBInput('');
    fetchData();
  };

  return (
    <div className="App">
      <h1>Resultados de la llamada a la API</h1>
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>Temporada: {data.temporada}</p>
          <input
            type="text"
            placeholder="Nuevo valor de temporada"
            value={temporadaInput}
            onChange={(e) => setTemporadaInput(e.target.value)}
          />
          <p>Valor de A: {data.A}</p>
          <input
            type="number"
            placeholder="Nuevo valor de A"
            value={aInput}
            onChange={(e) => setAInput(e.target.value)}
          />
          <p>Valor de B: {data.B}</p>
          <input
            type="number"
            placeholder="Nuevo valor de B"
            value={bInput}
            onChange={(e) => setBInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Enviar</button>
          <button onClick={handleEditDecision}>Editar</button>
        </div>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {showPopup && (
        <PopupConfirm
          message={`¿Está seguro que "${temporadaToConfirm}" es el nombre que quiere ponerle a la temporada ?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {showSuccessMessage && (
        <PopupSuccess
          message="Datos enviados con éxito"
          onClose={handleCloseSuccessPopup}
        />
      )}
      {showEditMessage && (
        <PopupMessage
          message="Datos editados con éxito"
          onClose={handleCloseEditMessage}
        />
      )}
    </div>
  );
}

export default LongitudPeso;
