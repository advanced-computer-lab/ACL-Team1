import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react';

function MyBookings() {

    let navigate = useNavigate();

    const [user,setUser] = useState();
    const { passportNumber }  = useParams()
    const [reservedFlights, setReservedFlights] = useState([]);

    const loadUserFromStorage = async () => {
        const savedUser = await localStorage.getItem('user');
        setUser(savedUser)
        
    }

    useEffect(() => {
        loadUserFromStorage()
    }, [passportNumber]);

    useEffect(() => {
        axios.get(`/reservations/reservedFlights/${passportNumber}`).then(response => setReservedFlights(response.data))
    }, [passportNumber]);



    const fetchReservedFlights = () => {
        axios.get(`/reservations/reservedFlights/${passportNumber}`)
            .then(res => setReservedFlights(res.data))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        fetchReservedFlights();
    }, []);


    const cancelFlight = (id) => {
        console.log(id)
        const body = { bookingNumber: id }
        axios.put(`/users/cancel/`, body)
            .then(() => navigate('/userConfirmedCancelation'))
            .catch((err) => console.log(err))

    }

    const editReservation =(id) => {
        // console.log(id)
        const body = { bookingNumber: id }
        axios.put(`/users/cancel/`, body)
            .then(() => navigate('/'))
            .catch((err) => console.log(err))
            console.log(id)

    }



    function returnToHome() {
        navigate('/')
    }
    



    return (
        <Container><br/>
        
        {localStorage.getItem('user') != null && reservedFlights.length > 0 ? <><div></div>
        :<br /><div className="row">
            {reservedFlights.map((reservation, key) => (

                <div class="pricing-column col-lg-4 pb-1" key={reservation.flightNumber}>
                <div id="flight-card" className="card shadow mb-5 bg-white rounded" key={reservation.flightNumber}>
                    <div className="card-header">
                        <h3 id="flight-number">Booking Number: {reservation.bookingNumber}</h3>
                    </div>
                    <div class="card-body">
                        <p id="passport-number-reservation"><Icon icon="mdi:passport" width="25" height="25"/>&nbsp;Passport Number: {reservation.passportNumber}</p>
                        <p id="flight-reserved"><Icon icon="fluent:airplane-20-filled" width="27" height="27"/>&nbsp;Flight Number: {reservation.flightNumber}</p>
                        <p id="cabin-reserved"><Icon icon="zmdi:airline-seat-recline-extra" width="25" height="25" />&nbsp;Cabin: {reservation.cabin}</p>
                        <p id="adults-seats"><Icon icon="el:adult" width="22" height="20"/>&nbsp;Reserved seats for adults: {reservation.adultsSeatsReserved}</p>
                        <p id="children-seats"><Icon icon="healthicons:child-program" hFlip={true} width="33" height="33"/>Reserved seats for children: {reservation.childrenSeatsReserved}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;<button id="edit-reservation" className="btn btn-warning" onClick={() => editReservation(reservation.bookingNumber)}>Edit Reservation</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button id="cancel-reservation" className="btn btn-danger" onClick={() => cancelFlight(reservation.bookingNumber)}>Cancel Reservartion</button>
                        
                        
                    </div>
                </div>

                </div>
                  
                  
                  
              ))}
          </div></> : <div><h3>No reserved flights.</h3></div>}<br />
          <button className="btn btn-secondary" onClick={returnToHome}>Return to Home page</button>&nbsp;&nbsp;&nbsp;

            </Container>
            
        
    )
}

export default MyBookings
