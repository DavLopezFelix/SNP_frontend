import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nortecentro.css'; 

function RankingPorPuntuacion() {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/ranking/general', {
          headers: {
            'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO'
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

export default RankingPorPuntuacion;

