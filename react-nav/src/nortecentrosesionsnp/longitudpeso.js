import React, { useState, useEffect } from 'react';
import PopupConfirm from './pupupconfirm';
import PopupSuccess from './popupsucces';
import PopupMessage from './popupmessage';
import './longitudpeso.css';

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
    <div className="longitudpeso">
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <table className="temporada-table">
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: '#00B3A1', color: 'white', textAlign: 'center' }}>Temporada:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  <p>{data.temporada}</p>
                  <input className="inputbox"
                    type="text"
                    placeholder="Nuevo valor de temporada"
                    value={temporadaInput}
                    onChange={(e) => setTemporadaInput(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan="2" style={{ backgroundColor: '#00B3A1', color: 'white', textAlign: 'center' }}>Valor de A:</th>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  <p>{data.A}</p>
                  <input className="inputbox"
                    type="number"
                    placeholder="Nuevo valor de A"
                    value={aInput}
                    onChange={(e) => setAInput(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan="2" style={{ backgroundColor: '#00B3A1', color: 'white', textAlign: 'center' }}>Valor de B:</th>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  <p>{data.B}</p>
                  <input className="inputbox"
                    type="number"
                    placeholder="Nuevo valor de B"
                    value={bInput}
                    onChange={(e) => setBInput(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <button className="button-enviar" onClick={handleSubmit}>Enviar</button>
      <button className="button-editar" onClick={handleEditDecision}>Editar</button>
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
