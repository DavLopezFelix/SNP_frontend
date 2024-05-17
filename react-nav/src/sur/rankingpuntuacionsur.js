import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../nortecentro/nortecentro.css';
const apiKey = process.env.REACT_APP_lastTemporada_ApiKey;
const API_url = process.env.REACT_APP_API_sur_url; 

function RankingPorPuntuacionSur() {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_url}/ranking/general`, {
          headers: {
            'x-api-key': apiKey
          }
        });
        setRankingData(response.data.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <div className="table-container-ranking">
        <table className="excel-like-table-ranking">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Empresas</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rankingData).map((empresa, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{empresa}</td>
              <td>{rankingData[empresa]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default RankingPorPuntuacionSur;

