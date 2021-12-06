
import './App.css';
import { Home } from './components/Home';
import { FlightsSchedule } from './components/FlightsSchedule';
import { Login } from './components/Login';
import Flight from './components/Flight'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavDropdown, Container, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useState } from "react";
import { UserAuthintication } from './components/UserAuthintication';
import ConfirmedReservation from './components/ConfirmedReservation';
import ConfirmedCancelation from './components/ConfirmedCancelation';



function App() {

  const [user, setUser] = useState(null);

  // async function login(user = null) {
  //   setUser(user);
  // }

  // async function logout() {
  //   setUser(null);
  // } 

const logout = () => {
  localStorage.removeItem('user')
  setUser(null)
}

  return (
    <BrowserRouter>
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top" >
        <Container fluid>
          <Navbar.Brand id="nav_title" href="/">Airline Reservation</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>

              {user ? (
                <button onClick={logout} className="nav-link" style={{ cursor: 'pointer' }} >
                  Logout 
                </button>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}

              <NavDropdown title="Flights" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/flightsSchedule">Flights Schedule</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar><br />
      <Fragment>


      </Fragment>

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/flightsSchedule' element={<FlightsSchedule />} />
        <Route path='/flights/:id' element={<Flight />} />
        <Route path='/userAuthintication' element={<UserAuthintication />} />
        <Route path='/confirmedReservation/:booking' element={<ConfirmedReservation />} />
        <Route path='/confirmedCancelation/:id' element={<ConfirmedCancelation />} />


      </Routes>




    </BrowserRouter >
  );
}


export default App;
