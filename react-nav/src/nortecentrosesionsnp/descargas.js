import React, { useState, useEffect } from 'react';

function Descargas() {
  const [temporadas, setTemporadas] = useState([]);
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

  return (
    <div>
      <h1>Temporadas</h1>
      <select>
        {temporadas.map((temporada, index) => (
          <option key={index} value={temporada}>
            {temporada}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Descargas;
