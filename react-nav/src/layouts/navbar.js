import {Navbar, Nav, Container} from "react-bootstrap";
import {Outlet, Link} from "react-router-dom";
import './navbar.css';
import logo from '../img/logoprincipal.png';
import logoSecundario from '../img/logoSalvamares.png';

const NavBarExample = () => {
    return (
        <>
            <Navbar className="navBg" variant="dark" expand="lg">
                <Container>
                    {/* Logo principal a la izquierda */}
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="Logo de SNP" className="nav-item-img" style={{ width: "95px", height: "85px"}}/>
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/" className="nav-item-custom">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/regionnortecentro" className="nav-item-custom">Región norte-centro</Nav.Link>
                        <Nav.Link as={Link} to="/regionsur" className="nav-item-custom">Región sur</Nav.Link>
                        <Nav.Link as={Link} to="/sesionsnp" className="nav-item-custom">Sesión de SNP</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {/* {<Container className="justify-content-end"> */}
                    {/* Logo secundario a la derecha */}
                    <img src={logoSecundario} alt="Logo Secundario" className="nav-item-img" style={{ width: "150px", height: "65px" }}/>
                </Container>
            </Navbar>
            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
};

export default NavBarExample;