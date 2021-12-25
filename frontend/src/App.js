
import './App.css';
import { Home } from './components/Home';
import { AllBookings } from './components/AllBookings';
import Login  from './components/Login';
import Flight from './components/Flight'
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import ConfirmedReservation from './components/ConfirmedReservation';
import ConfirmedCancelation from './components/ConfirmedCancelation';
import UserConfirmedCancelation from './components/UserConfirmedCancelation';
import Profile from './components/Profile';
import Register from './components/Register';
import MyBookings from './components/MyBookings'
import ItineraryMail from './components/ItineraryMail'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import CustomInput from "./components/CustomInput";
// import Button from "./components/Button";




function App() {

  // let navigate = useNavigate();

  const[email, setEmail] = useState(null)
  const[user, setUser] = useState();


  // let navigate = useNavigate();

  // const [user, setUser] = useState(null);

  // async function login(user = null) {
  //   setUser(user);
  // }

  // async function logout() {
  //   setUser(null);
  // } 

  const loadUserFromStorage = async () => {
    const savedUser = await JSON.parse(localStorage.getItem('user'));
    setUser(savedUser)
    
}



useEffect(() => {
  loadUserFromStorage()
}, []);


  // function viewMyBookings(passportNumber) {
  //   navigate(`/reservations/reservedFlights/${passportNumber}`)
  //   // axios.get(`/reservations/reservedFlights/${passportNumber}`)
  //   //         .then(res => setReservedFlights(res.data))
  //   //         .catch(error => console.log(error));
  //   //      console.log(user.passportNumber)   
  // }

  

  async function logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  function viewMyBookings(passportNumber) {
    window.location.href = `/myBookings/${passportNumber}`
    console.log(passportNumber)
    
  }

  function viewProfile(passportNumber) {
    window.location.href = `/profile/${passportNumber}`
    console.log(passportNumber)
  }
  // useEffect(() => {
  //   fetch("/isUserAuth", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token")
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(data => data.isLoggedIn ? setEmail(data.email): null)
  // }, [])


let isAdmin 
if(user==null){
   isAdmin = false

}else{
  isAdmin = user.isAdmin
}
  




  return (
    <Container className="p-0 background-image" fluid>
      <BrowserRouter>
      
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top" >

          <Navbar.Brand id="nav_title" href="/">Airline Reservation</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/"><button id="home-navbar" className="btn btn-dark">Home</button></Nav.Link>
              {localStorage.getItem('user') != null 
              ? <Nav.Link ><button id="profile-navbar" className="btn btn-dark" onClick={() => viewProfile(user.passportNumber)}>Profile</button></Nav.Link>
              : <></>}
              {localStorage.getItem('user') != null
                ? <><Nav.Link href="/"><button id="logout-navbar" className="btn btn-dark" onClick={logout}>Logout</button></Nav.Link>
                  <Nav.Link><button id="user-flight-schedule-navbar" className="btn btn-dark" onClick={() => viewMyBookings(user.passportNumber)}>My Bookings</button></Nav.Link>
                </>
                : <> <Nav.Link href="/login"><button id="login-navbar"className="btn btn-dark">Login</button></Nav.Link>
                  <Nav.Link href="/register"><button id="register-navbar" className="btn btn-dark">Register</button></Nav.Link>
                </>
              }
              {isAdmin != true
                ? <></>
                : <Nav.Link href="/allBookings"><button id="flight-schedule-navbar" className="btn btn-dark">All Bookings</button></Nav.Link>
              }
              


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

        </Navbar>
        


        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/allBookings' element={<AllBookings />} />
          <Route path='/myBookings/:passportNumber' element={<MyBookings />} />
          <Route path='/profile/:passportNumber' element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/flights/:id' element={<Flight />} />
          <Route path='/confirmedReservation' element={<ConfirmedReservation />} />
          <Route path='/confirmedCancelation' element={<ConfirmedCancelation />} />
          <Route path='/userConfirmedCancelation' element={<UserConfirmedCancelation />} />
          <Route path='/itineraryMail' element={<ItineraryMail />} />

        </Routes>




      </BrowserRouter >
     </Container>
  );
}


export default App;
