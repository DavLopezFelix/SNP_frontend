import {Navbar, Nav, Container} from "react-bootstrap"
import {Outlet, Link} from "react-router-dom"

const NavBarExample = () => {
    return(
       <>
       <Navbar className="navBg" variant="dark" expand="lg">
       <Container>
            <Navbar.Brand as={Link} to="/" >Sociedad Nacional de Pesquería</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                 <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
                 <Nav.Link as={Link} to="/regionnortecentro" >Región norte-centro</Nav.Link>
                 <Nav.Link as={Link} to="/regionsur" >Región sur</Nav.Link>
                 <Nav.Link as={Link} to="/sesionsnp" >Sesión de SNP</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>  

        <section>
            <Outlet></Outlet>
        </section>
       </> 
    )
}
export default NavBarExample