import React from 'react';

const HomeSesionsnp = ({ signOut }) => {
    return (
        <>
            <div>
                <div>
                    <h2>Bienvenido a la Sesión de SNP</h2>
                    <h3>Tu autenticador</h3>
                    <form>
                        <button onClick={signOut}>Cerrar Sesión</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default HomeSesionsnp;
