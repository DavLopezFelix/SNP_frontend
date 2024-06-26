import React, { useState, useEffect } from 'react';
import PopupMessage from './popupmessage'; // Importa el componente PopupMessage
import './descargas.css';

const apiKey = process.env.REACT_APP_lastTemporada_ApiKey;
const API_url = process.env.REACT_APP_API_url;

function Descargas() {
  const [temporadas, setTemporadas] = useState([]);
  const [selectedTemporada, setSelectedTemporada] = useState('');
  const [rankingData, setRankingData] = useState(null);
  const [dataCruda, setDataCruda] = useState(null);
  const [dataConsolidada, setDataConsolidada] = useState(null);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [loadingCruda, setLoadingCruda] = useState(false);
  const [loadingConsolidada, setLoadingConsolidada] = useState(false);
  const [loadingImarpe, setLoadingImarpe] = useState(false);
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del mensaje emergente

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_url}/temporadasUbicaciones/listTemporadas`, {
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

  const handleDownloadRanking = async () => {
    if (!selectedTemporada) {
      setError('Seleccione la temporada');
      return;
    }

    try {
      setLoadingRanking(true);
      const response = await fetch(`${API_url}/downloadFiles/rankings?temporada=${selectedTemporada}`, {
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
    } finally {
      setLoadingRanking(false);
    }
  };

  const handleDownloadData = async () => {
    if (!selectedTemporada) {
      setError('Seleccione la temporada');
      return;
    }

    try {
      setLoadingCruda(true);
      setLoadingConsolidada(true);

      // Llamada a la segunda API para la data cruda y consolidada
      const response = await fetch(`${API_url}/downloadFiles/consolidadoAndProcesado?temporada=${selectedTemporada}`, {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setDataCruda(data);
      setDataConsolidada(data); // La misma respuesta para la data cruda y consolidada

      // Abre automáticamente el enlace de descarga
      if (data.LinkDeDescarga) {
        window.open(data.LinkDeDescarga, '_blank');
        setConfirmationMessage('La solicitud de descarga se realizó exitosamente.');
        setShowPopup(true); // Mostrar el mensaje emergente
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingCruda(false);
      setLoadingConsolidada(false);
    }
  };

  const handleDownloadImarpe = async () => {
    if (!selectedTemporada) {
      setError('Seleccione la temporada');
      return;
    }

    try {
      setLoadingImarpe(true);
      const response = await fetch(`${API_url}/downloadFiles/imarpe?temporada=${selectedTemporada}`, {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLoadingImarpe(data);

      // Abrir automáticamente el enlace de descarga en una nueva ventana
      if (data.LinkDeDescarga) {
        setConfirmationMessage('La solicitud de descarga se realizó exitosamente.');
        setShowPopup(true); // Mostrar el mensaje emergente
        window.open(data.LinkDeDescarga, '_blank');
      }
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    } finally {
      setLoadingImarpe(false);
    }
  };

  // Lógica para descargar desde IMARPE
  // Por ahora, vamos a simular una alerta
  // alert('Descargando desde IMARPE...');

  const closePopup = () => {
    setShowPopup(false); // Ocultar el mensaje emergente al cerrarlo
    setConfirmationMessage('');
  };

  return (
    <div>
      <div className="descargas-container">
        <select className="select-dropdown" value={selectedTemporada} onChange={handleChange}>
          <option value="" disabled>Seleccione temporada</option>
          {temporadas.map((temporada, index) => (
            <option key={index} value={temporada}>
              {temporada}
            </option>
          ))}
        </select>
      </div>
      <div className="table-wrapper">
        <table className="options-table">
          <tbody>
            <tr>
              <th>Ranking</th>
              <th>Data cruda y data consolidada</th>
              <th>IMARPE</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons-wrapper">
        <button className="button1" onClick={handleDownloadRanking} disabled={loadingRanking || loadingCruda || loadingConsolidada || loadingImarpe}>
          Descargar
        </button>
        <button className="button2" onClick={handleDownloadData} disabled={loadingRanking || loadingCruda || loadingConsolidada || loadingImarpe}>
          Descargar
        </button>
        <button className="button3" onClick={handleDownloadImarpe} disabled={loadingRanking || loadingCruda || loadingConsolidada || loadingImarpe}>
          Descargar
        </button>
      </div>
      <div className="error-container">
        {error && <p className="error-message">{error}</p>}
      </div>
      {showPopup && <PopupMessage message={confirmationMessage} onClose={closePopup} />} {/* Mostrar el mensaje emergente */}
      {loadingRanking && <p className="loading-message">Descargando Ranking...</p>}
      {rankingData && (
        <div className="data-container">
          {/* Renderizar los datos de ranking aquí */}
        </div>
      )}
      {loadingCruda && <p className="loading-message1">Descargando Data Cruda...</p>}
      {dataCruda && (
        <div className="data-container">
          {/* Renderizar los datos de ranking aquí */}
        </div>
      )}
      {loadingConsolidada && <p className="loading-message2">Descargando Data Consolidada...</p>}
      {dataConsolidada && (
        <div className="data-container">
          {/* Renderizar los datos de ranking aquí */}
        </div>
      )}
      {loadingImarpe && <p className="loading-message2">Descargando Data IMARPE...</p>}
      {dataConsolidada && (
        <div className="data-container">
          {/* Renderizar los datos de ranking aquí */}
        </div>
      )}
    </div>
  );
}

export default Descargas;
