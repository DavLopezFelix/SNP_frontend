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
    <div className="table-container-reportes">
      <table className="excel-like-table-reportes">
        <thead>
          <tr>
            <th colSpan="4" className="season-header"> {rankingData.Temporada}</th>
          </tr>
          <tr>
            <th className="table-header">Empresa</th>
            <th className="table-header">Calas</th>
            <th className="table-header">Faenas</th>
            <th className="table-header">Tallas</th>
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
