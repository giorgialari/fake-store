import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getAllCategories } from '../../api/Api';


function Header() {
  const [Data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token')); // verifica se il token esiste

  useEffect(() => {
      getAllCategories().then((data) => setData(data));
  }, [])

  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate(`/${category}`);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // rimuovi il token dal sessionStorage
    setIsLoggedIn(false); // setta la variabile di stato a false
    navigate('/login'); // reindirizza all pagina di login
  };


  return (
    <>
      {isLoggedIn ? ( // verifica se l'utente è loggato
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>FakeStore</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav className="me-auto">
                  <Link className="nav-link" aria-current="page" to="/">Products</Link>
                  <Link className="nav-link" aria-current="page" to="/add-product">Add Product</Link>
                </Nav>
                {/* <Nav.Link href="#link">Link</Nav.Link> */}
                <NavDropdown title="Category" id="basic-nav-dropdown">
                  {Data.length ? (
                    Data.map((data) => {
                      return (
                        <NavDropdown.Item key={data}>
                          <Link className="nav-link" aria-current="page" to={'/'+ data} onClick={() => goToCategory(data)}>{data}</Link>
                        </NavDropdown.Item>
                      )
                    })
                  ) : (
                    <div>''</div>
                  )}
                </NavDropdown>
                <Link className="nav-link" aria-current="page" to="/login" onClick={handleLogout}>Logout</Link> {/* mostra il pulsante "Logout" */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null /* se l'utente non è loggato, non mostra nulla */}

      {!isLoggedIn ? ( // verifica se l'utente non è loggato
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>FakeStore</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" aria-current="page" to="/login">Login</Link> {/* mostra il pulsante "Login" */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null /* se l'utente è loggato, non mostra nulla */}
    </>
  )
}

export default Header