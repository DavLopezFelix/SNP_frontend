import React, { useState, useEffect } from 'react';
import './reportesempresas.css'; // Importa tu archivo CSS para estilos personalizados

function ReportesEmpresas() {
  const [rankingData, setRankingData] = useState(null);

  useEffect(() => {
    fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/ranking/empresas', {
      method: 'GET',
      headers: {
        'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRankingData(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  if (!rankingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container-ranking">
      <h2>Ranking - {rankingData.Temporada}</h2>
      <table className="excel-like-table-ranking">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Calas</th>
            <th>Faenas</th>
            <th>Tallas</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rankingData.Data).map(([empresa, datos]) => (
            <tr key={empresa}>
              <td>{empresa}</td>
              <td>{datos[0].Calas}</td>
              <td>{datos[0].Faenas}</td>
              <td>{datos[0].Tallas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportesEmpresas;
