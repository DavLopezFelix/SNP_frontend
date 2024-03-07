import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Importamos los componentes creados
import Regionnortecentro from './components/regionnortecentro';
import Regionsur from './components/regionsur';
import Inicio from './components/inicio';
import Sesionsnp from './components/sesionsnp';
import NavBarExample from './layouts/navbar';

function App() {
  return (
    <div className="App">

       <BrowserRouter>
       <Routes>
        <Route path='/' element={<NavBarExample />}>
          <Route index element={ <Inicio />}  />
          <Route path='regionnortecentro' element={ <Regionnortecentro />}  />
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
