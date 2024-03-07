import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Importamos los componentes creados
import Regionnortecentro from './components/regionnortecentro';
import Regionsur from './components/regionsur';
import Inicio from './components/inicio';
import Sesionsnp from './components/sesionsnp';
import NavBarExample from './layouts/navbar';
import ReportesEmpresas from './nortecentro/reportesempresas';
import RankingPorPuntuacion from './nortecentro/rankingpuntuacion';

function App() {
  return (
    <div className="App">

       <BrowserRouter>
       <Routes>
        <Route path='/' element={<NavBarExample />}>
          <Route index element={ <Inicio />}  />
          <Route path='regionnortecentro' element={ <Regionnortecentro />}  />
          <Route path='regionnortecentro/reportesempresas' element={<ReportesEmpresas />} />
          <Route path='regionnortecentro/rankingporpuntuacion' element={<RankingPorPuntuacion />} />

          <Route path='Regionsur' element={ <Regionsur />}  />
          <Route path='Sesionsnp' element={ <Sesionsnp />}  />

          <Route path='*' element={ <Navigate replace to="/"/> }/>

        </Route>
       </Routes>
       </BrowserRouter>

    </div>
  );
}

export default App;
