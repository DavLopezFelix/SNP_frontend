import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Importamos los componentes creados
import Regionnortecentro from './componentsclient/regionnortecentro';
import Regionsur from './componentsclient/regionsur';
import Inicio from './componentsclient/inicio';
import Sesionsnp from './componentsclient/sesionsnp';
import NavBarExample from './layouts/navbar';
import ReportesEmpresas from './nortecentro/reportesempresas';
import RankingPorPuntuacion from './nortecentro/rankingpuntuacion';
import ReportesEmpresasSur from './sur/reportesempresasur';
import RankingPorPuntuacionSur from './sur/rankingpuntuacionsur';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rutas que muestran NavBarExample */}
          <Route path='/' element={<NavBarExample />}>
            <Route index element={<Inicio />} />
            <Route path='regionnortecentro' element={<Regionnortecentro />} />
            <Route path='regionnortecentro/reportesempresas' element={<ReportesEmpresas />} />
            <Route path='regionnortecentro/rankingporpuntuacion' element={<RankingPorPuntuacion />} />
            <Route path='Regionsur' element={<Regionsur />} />
            <Route path='Regionsur/reportesempresasur' element={<ReportesEmpresasSur />} />
            <Route path='Regionsur/rankingporpuntuacionsur' element={<RankingPorPuntuacionSur />} />
          </Route>
          {/* Ruta que no muestra NavBarExample */}
          <Route path='Sesionsnp' element={<Sesionsnp />} />
          {/* Ruta por defecto */}
          <Route path='*' element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
