import React, { useState } from 'react';
import Boton from '../nortecentro/boton';
import '../componentsclient/estilosregiones.css'; 
import UbicacionCarpetas from '../nortecentrosesionsnp/ubicacioncarpetas';
import Descargas from '../nortecentrosesionsnp/descargas';
import LongitudPeso from '../nortecentrosesionsnp/longitudpeso';

const RegionNorteCentroSNP = () => {
    const [mostrarLongitudPeso, setMostrarLongitudPeso] = useState(true); // Inicialmente mostramos Reportes de empresa
    const [mostrarUbicacionCarpetas, setMostrarUbicacionCarpetas] = useState(false);
    const [mostrarDescargas, setMostrarDescargas] = useState(false);


    const mostrarSoloLongitudPeso = () => {
        setMostrarLongitudPeso(true);
        setMostrarUbicacionCarpetas(false);
        setMostrarDescargas(false);
    };

    const mostrarSoloUbicacionCarpetas = () => {
        setMostrarLongitudPeso(false);
        setMostrarUbicacionCarpetas(true);
        setMostrarDescargas(false);
    };
    const mostrarSoloDescargas = () => {
        setMostrarLongitudPeso(false);
        setMostrarUbicacionCarpetas(false);
        setMostrarDescargas(true);
    };

    return (
        <div>
            <div className="table-container">
                <table className="excel-like-table">
                    <tbody>
                        <tr>
                            <td>
                                <h1 className="region-title">Región norte-centro</h1>
                            </td>
                            <td style={{ backgroundColor: mostrarLongitudPeso ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Reportes de Empresas */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloLongitudPeso} color={mostrarLongitudPeso ? '#1E9AAA' : 'white'} textColor={mostrarLongitudPeso ? 'white' : 'black'}>
                                        Relación Longitud - Peso
                                    </Boton>
                                </div>
                            </td>
                            <td style={{ backgroundColor: mostrarUbicacionCarpetas ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Ranking por Puntuación */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloUbicacionCarpetas} color={mostrarUbicacionCarpetas? '#1E9AAA' : 'white'} textColor={mostrarUbicacionCarpetas ? 'white' : 'black'}>
                                        Ubicación de carpetas
                                    </Boton>
                                </div>
                            </td>
                            <td style={{ backgroundColor: mostrarDescargas ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Ranking por Puntuación */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloDescargas} color={mostrarDescargas? '#1E9AAA' : 'white'} textColor={mostrarDescargas ? 'white' : 'black'}>
                                        Descargas
                                    </Boton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Cuadro grande para los mensajes debajo de la tabla */}
            <div className="cuadro-grande">
                {mostrarLongitudPeso && (
                    <div>
                        <LongitudPeso />
                    </div>
                )}
                {mostrarUbicacionCarpetas && (
                    <div>
                        <UbicacionCarpetas />
                    </div>
                )}
                 {mostrarDescargas && (
                    <div>
                        <Descargas />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegionNorteCentroSNP;
