// import React from 'react';
// import { Authenticator } from '@aws-amplify/ui-react';
// import HomeSesionsnp from '../componentssnp/homesesionsnp';
// import '@aws-amplify/ui-react/styles.css';
// import '../componentsclient/sesionsnp.css';

// const Sesionsnp = () => {
         
//     return (
//         <div>
            
//             <div className="authenticator-container">
//                 <Authenticator>
//                     {({ signOut }) => (
//                         <HomeSesionsnp signOut={signOut} />
//                     )} 
//                 </Authenticator>
//             </div>
//         </div>
//     );
// }

// export default Sesionsnp;

import React from 'react';
import RegionNorteCentroSNP from '../componentssnp/regionnortecentrosnp';

const Sesionsnp = () => {
    return (
        <div>
            {/* Renderiza directamente la vista RegionNorteCentroSNP */}
            <RegionNorteCentroSNP />
        </div>
    );
}

export default Sesionsnp;
