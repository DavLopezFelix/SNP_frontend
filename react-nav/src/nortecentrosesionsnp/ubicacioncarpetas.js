import React, { useState, useEffect } from 'react';
import './ubicacioncarpeta.css';
import PopupMessage from './popupmessage'; // Importa el componente PopupMessage

const UbicacionCarpetas = () => {
  const [appData, setAppData] = useState(null);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({
    App1: '',
    App2: '',
    App3: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputModified, setInputModified] = useState(false); // Estado para rastrear si se han modificado los campos de entrada

  const fetchData = async () => {
    try {
      const response = await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/appLocation', {
        headers: {
          'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO'
        }
      });
      const responseData = await response.json();
      setAppData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event, appName) => {
    const { value } = event.target;
    setNuevaUbicacion(prevState => ({
      ...prevState,
      [appName]: value
    }));

    // Verifica si algún campo de entrada tiene valor
    const isAnyFieldFilled = Object.values({ ...nuevaUbicacion, [appName]: value }).some(val => val !== '');
    setInputModified(isAnyFieldFilled); // Marca que se han modificado los campos de entrada si algún campo tiene valor
  };

  const enviarDatos = async () => {
    if (!inputModified) { // Verifica si se han modificado los campos de entrada
      setErrorMessage('Ingrese al menos una nueva ubicación'); // Establece el mensaje de error si no se ha modificado ningún campo
      return;
    }
    try {
      const response = await fetch('https://0fdeuy89wl.execute-api.us-east-1.amazonaws.com/snpPreprod/temporadasUbicaciones/appLocation', {
        method: 'POST',
        headers: {
          'x-api-key': 'GafXD93ZXV3jbslFcBaXT1ALLcKkBBG04JP9ZmCO',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaUbicacion)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setSuccessMessage('¡Datos enviados con éxito!');
      setErrorMessage('');
      console.log('Response data:', responseData);
    } catch (error) {
      setErrorMessage('Error al enviar los datos. Por favor, inténtalo de nuevo.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  const closePopup = () => {
    setSuccessMessage('');
    setNuevaUbicacion({ // Limpiar los campos de entrada
      App1: '',
      App2: '',
      App3: ''
    });
    setInputModified(false); // Establecer inputModified como false cuando se cierra el popup
    fetchData(); // Hacer de nuevo el llamado al endpoint para obtener la ubicación de los archivos
  };

  return (
    <div className="ubicacion-carpetas-container">
      {successMessage && <PopupMessage message={successMessage} onClose={closePopup} />}
      <div className="app-container">
        <table className="ubicacion-carpetas-table">
          <thead>
            <tr>
              <th colSpan="2" style={{ backgroundColor: '#00B3A1', color: 'white', textAlign: 'center' }}>Aplicación 1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="link-cell" colSpan="2">
                <p>{appData ? appData.App1: 'Loading...'}</p>
                <input
                  type="text"
                  placeholder="Define la nueva ubicación de tus archivos"
                  value={nuevaUbicacion.App1}
                  onChange={(e) => handleInputChange(e, 'App1')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="app-container">
        <table className="ubicacion-carpetas-table">
          <thead>
            <tr>
              <th colSpan="2" style={{ backgroundColor: '#00B3A1', color: 'white', textAlign: 'center' }}>Aplicación 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="link-cell" colSpan="2">
                <p>{appData ? appData.App2 : 'Loading...'}</p>
                <input
                  type="text"
                  placeholder="Define la nueva ubicación de tus archivos"
                  value={nuevaUbicacion.App2}
                  onChange={(e) => handleInputChange(e, 'App2')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="app-container">
        <table className="ubicacion-carpetas-table">
          <thead>
            <tr>
              <th colSpan="2" style={{ backgroundColor: '#00B3A1', color: 'white', textAlign: 'center' }}>Aplicación 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="link-cell" colSpan="2">
                <p>{appData ? appData.App3 : 'Loading...'}</p>
                <input
                  type="text"
                  placeholder="Define la nueva ubicación de tus archivos"
                  value={nuevaUbicacion.App3}
                  onChange={(e) => handleInputChange(e, 'App3')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="error-container"> {/* Nuevo contenedor para el mensaje de error */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="enviar-button" onClick={enviarDatos}>Enviar</button>
      <button className="ejecutar-button" onClick={enviarDatos}>Ejecutar la data ahora</button>
      </div>
    </div>
  );
};

export default UbicacionCarpetas;
