import React, { useState, useEffect } from 'react';
import PopupConfirm from './pupupconfirm';
import PopupSuccess from './popupsucces';

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
        </div>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleSubmit}>Enviar</button>
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
    </div>
  );
}

export default LongitudPeso;
