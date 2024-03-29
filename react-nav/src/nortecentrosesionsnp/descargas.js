import React, { useState, useEffect } from 'react';
import './ubicacioncarpeta.css'; // Asegúrate de importar los estilos CSS adecuados
import PopupMessage from './popupmessage'; // Importa el componente PopupMessage

function Descargas() {
  const [temporadas, setTemporadas] = useState([]);
  const [selectedTemporada, setSelectedTemporada] = useState('');
  const [rankingData, setRankingData] = useState(null);
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del mensaje emergente
  const apiKey = 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/listTemporadas', {
          headers: {
            'x-api-key': apiKey
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTemporadas(data.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiKey]);

  const handleChange = (event) => {
    setSelectedTemporada(event.target.value);
    setError('');
  };

  const handleDownload = async () => {
    if (!selectedTemporada) {
      setError('Seleccione la temporada');
      return;
    }

    try {
      const response = await fetch(`https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/downloadFiles/rankings?temporada=${selectedTemporada}`, {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRankingData(data);
      
      // Abrir automáticamente el enlace de descarga en una nueva ventana
      if (data.LinkDeDescarga) {
        setConfirmationMessage('La solicitud de descarga se realizó exitosamente.');
        setShowPopup(true); // Mostrar el mensaje emergente
        window.open(data.LinkDeDescarga, '_blank');
      }
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Ocultar el mensaje emergente al cerrarlo
    setConfirmationMessage('');
  };

  return (
    <div>
      <h1>Temporadas</h1>
      <select value={selectedTemporada} onChange={handleChange}>
        <option value="" disabled>Seleccione temporada</option>
        {temporadas.map((temporada, index) => (
          <option key={index} value={temporada}>
            {temporada}
          </option>
        ))}
      </select>
      <button onClick={handleDownload}>Descargar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showPopup && <PopupMessage message={confirmationMessage} onClose={closePopup} />} {/* Mostrar el mensaje emergente */}
      {rankingData && (
        <div>
          {/* Renderizar los datos de ranking aquí */}
        </div>
      )}
    </div>
  );
}

export default Descargas;
