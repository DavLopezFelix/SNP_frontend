import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Importamos componentes para las vistas del cliente
import NavBarExample from './layouts/navbar';
import Regionnortecentro from './componentsclient/regionnortecentro';
import Regionsur from './componentsclient/regionsur';
import ReportesEmpresas from './nortecentro/reportesempresas';
import RankingPorPuntuacion from './nortecentro/rankingpuntuacion';
import Sesionsnp from './componentsclient/sesionsnp';

// Importamos componentes para las vistas de la SNP
import NavbarHomeSesionsnp from './layouts/navbarhomesesionsnp';
import NavbarSesionsnp from './layouts/navbarsesionsnp';
import HomeSesionsnp from './componentssnp/homesesionsnp';
import RegionNorteCentroSNP from './componentssnp/regionnortecentrosnp';
import RegionSurSNP from './componentssnp/regionsursnp';
import LongitudPeso from './nortecentrosesionsnp/longitudpeso';
import UbicacionCarpetas from './nortecentrosesionsnp/ubicacioncarpetas';
import Descargas from './nortecentrosesionsnp/descargas';
import LongitudPesoSur from './sursesionsnp/longitudpesosur';
import UbicacionCarpetasSur from './sursesionsnp/ubicacioncarpetassur';
import DescargasSur from './sursesionsnp/descargassur';

import Footer from './footer/footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rutas que muestran NavBarExample */}
          <Route path='/' element={<NavBarExample />}>
            <Route index element={<Regionnortecentro />} />
            <Route path='regionnortecentro' element={<Regionnortecentro />} />
            <Route path='regionnortecentro/reportesempresas' element={<ReportesEmpresas />} />
            <Route path='regionnortecentro/rankingporpuntuacion' element={<RankingPorPuntuacion />} />
            <Route path='regionsur' element={<Regionsur />} />
            <Route path='regionsur/reportesempresasur' element={<ReportesEmpresas />} />
            <Route path='regionsur/rankingporpuntuacionsur' element={<RankingPorPuntuacion />} />           
          </Route>
      
          
          {/* Esto es lo que estaba antes:
          <Route path='/sesionsnp/*' element={<NavbarSesionsnp />}>
          <Route index element={<Sesionsnp />} />
          </Route>
            
          <Route path='/RegionNorteCentroSNP/*' element={<NavbarHomeSesionsnp />}>
            <Route index element={<RegionNorteCentroSNP />} />
          Hasta aquí */}


          {/* Esto es lo que se agrego: */}
            <Route path="sesionsnp/*" element={<NavbarHomeSesionsnp />}>
            <Route index element={<Sesionsnp />} />
            {/* Hasta aqui */}
            <Route path='regionnortecentrosnp' element={<RegionNorteCentroSNP />} />
            <Route path='regionnortecentrosnp/longitudpeso' element={<LongitudPeso />} />
            <Route path='regionnortecentrosnp/ubicacioncarpetas' element={<UbicacionCarpetas />} />
            <Route path='regionnortecentrosnp/descargas' element={<Descargas />} />  
                  
            <Route path='regionsursnp' element={<RegionSurSNP />} />
            <Route path='regionsursnp/longitudpesosur' element={<LongitudPesoSur />} />
            <Route path='regionsursnp/ubicacioncarpetassur' element={<UbicacionCarpetasSur />} />
            <Route path='regionsursnp/descargassur' element={<DescargasSur />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path='*' element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
