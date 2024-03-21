import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Importamos los componentes creados
import Regionnortecentro from './componentssnp/regionnortecentrosnp';
import Regionsur from './componentssnp/regionsursnp';
import HomeSesionsnp from './componentssnp/homesesionsnp';
import NavBarSNP from './layouts/navbarsesionsnp';
import LongitudPeso from './nortecentrosesionsnp/longitudpeso';
import UbicacionCarpetas from './nortecentrosesionsnp/ubicacioncarpetas';
import Descargas from './nortecentrosesionsnp/descargas';
import LongitudPesoSur from './sursesionsnp/longitudpeso';
import UbicacionCarpetasSur from './sursesionsnp/ubicacioncarpetas';
import DescargasSur from './sursesionsnp/descargas';
// import CerrarSesion from './componentssnp/cerrarsesion';


function Appsnp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rutas que muestran NavBar */}
          <Route path='/' element={<NavBarSNP />}>
            <Route index element={<HomeSesionsnp />} />
            <Route path='regionnortecentro' element={<Regionnortecentro />} />
            <Route path='regionnortecentro/longitudpeso' element={<LongitudPeso />} />
            <Route path='regionnortecentro/ubicacioncarpetas' element={<UbicacionCarpetas />} />
            <Route path='regionnortecentro/descargas' element={<Descargas />} />
            <Route path='Regionsur' element={<Regionsur />} />
            <Route path='Regionsur/longitudpeso' element={<LongitudPesoSur />} />
            <Route path='Regionsur/ubicacioncarpetas' element={<UbicacionCarpetasSur />} />
            <Route path='Regionsur/descargas' element={<DescargasSur />} />

          </Route>
          {/* Ruta que no muestra NavBar */}
          {/* Ruta por defecto */}
          <Route path='*' element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default Appsnp;
