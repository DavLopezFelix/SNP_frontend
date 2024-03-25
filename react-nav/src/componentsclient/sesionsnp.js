import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import HomeSesionsnp from '../componentssnp/homesesionsnp';
import '@aws-amplify/ui-react/styles.css';
import '../componentsclient/sesionsnp.css';

const Sesionsnp = () => {
         console.log("Bienvenido a la sesion");
         
    return (
        <div>
            
            {/* Contenedor para centrar el Authenticator */}
            <div className="authenticator-container">
                <Authenticator>
                    {({ signOut }) => (
                        <HomeSesionsnp signOut={signOut} />
                    )} 
                </Authenticator>
            </div>
        </div>
    );
}

export default Sesionsnp;
