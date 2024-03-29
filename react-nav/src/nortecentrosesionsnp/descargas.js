import React, { useState, useEffect } from 'react';

function Descargas() {
  const [temporadas, setTemporadas] = useState([]);
  const [selectedTemporada, setSelectedTemporada] = useState('');
  const [rankingData, setRankingData] = useState(null);
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
  };

  const handleDownload = async () => {
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
        window.open(data.LinkDeDescarga, '_blank');
      }
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    }
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
      <button onClick={handleDownload}>Descargar Ranking</button>
      {rankingData && (
        <div>
          {/* Renderizar los datos de ranking aquí */}
        </div>
      )}
    </div>
  );
}

export default Descargas;
