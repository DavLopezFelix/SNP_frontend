import React from 'react';
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import logo from '../img/logoprincipal.png';
import logoSecundario from '../img/logoSalvamares.png';

const NavbarHomeSesionsnp = ({ signOut,setUser }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Realiza las operaciones necesarias para cerrar sesión
        if (signOut) {
            setUser(null)
            signOut();
        }

        // Redirige al usuario a la vista principal
        navigate('/');
    }

    return (
            <Navbar className="navBg" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="Logo de SNP" className="nav-item-img" style={{ width: "95px", height: "85px"}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="regionnortecentrosnp" className="nav-item-custom">Región norte-centro</Nav.Link>
                            <Nav.Link as={Link} to="regionsursnp" className="nav-item-custom">Región sur</Nav.Link>
                            <Nav.Link className="nav-item-custom" onClick={handleSignOut}>Cerrar Sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <img src={logoSecundario} alt="Logo Secundario" className="nav-item-img" style={{ width: "150px", height: "65px" }}/>
                </Container>
            </Navbar>
           
    );
};

export default NavbarHomeSesionsnp;
