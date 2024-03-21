import React from 'react';
import { Link } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Sesionsnp = () => {
    return (
        <div>
            <Link to="/regionnortecentro">Inicio.</Link>
            <Authenticator>
                {({ signOut }) => (
                    <div>
                        <h2>Bienvenido a la Sesión de SNP</h2>
                        <h3>Tu autenticador</h3>
                        <form>
                            <button onClick={signOut}>Cerrar Sesión</button>
                        </form>
                    </div>
                )} 
            </Authenticator>
            {/* Enlace para regresar a la vista principal */}
            {/* <Link to="/">Inicio.</Link> */}
            {/* Aquí puedes agregar más contenido si es necesario */}
        </div>
    );
}

export default Sesionsnp;