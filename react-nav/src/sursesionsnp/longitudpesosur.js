import React, { useState, useEffect } from 'react';
import PopupConfirm from '../nortecentrosesionsnp/pupupconfirm';
import PopupSuccess from '../nortecentrosesionsnp/popupsucces';
import PopupMessage from '../nortecentrosesionsnp/popupmessage';
import './longitudpesosur.css';
const apiKey = process.env.REACT_APP_lastTemporada_ApiKey;
const API_url = process.env.REACT_APP_API_sur_url;

function LongitudPesoSur() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [temporadaInput, setTemporadaInput] = useState('');
  const [aInput, setAInput] = useState('');
  const [bInput, setBInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
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
      const response = await fetch(`${API_url}/temporadasUbicaciones/lastTemporada`, {
        headers: {
          'x-api-key': apiKey
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
      await fetch(`${API_url}/temporadasUbicaciones/lastTemporada`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          temporada: temporadaInput,
          A: parseFloat(aInput),
          B: parseFloat(bInput)
        })
      });

      fetchData();

      setTemporadaInput('');
      setAInput('');
      setBInput('');
      setLinkInput('');
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
      await fetch(`${API_url}/temporadasUbicaciones/aybVariables`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
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
    setTemporadaInput('');
    setAInput('');
    setBInput('');
    setLinkInput('');
    fetchData();
  };

  const handleSendLink = () => {
    console.log('Enviando link:', linkInput);

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
                  <input
                    className="inputbox"
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
                  <input
                    className="inputbox"
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
                  <input
                    className="inputbox"
                    type="number"
                    placeholder="Nuevo valor de B"
                    value={bInput}
                    onChange={(e) => setBInput(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className='containersur'>
          <button className="button-enviar-sur" onClick={handleSubmit}>Enviar</button>
          <button className="button-editar-sur" onClick={handleEditDecision}>Editar</button>
          </div>
          <div className='containersur'>
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
         <div>
            <div>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default LongitudPesoSur;
 
