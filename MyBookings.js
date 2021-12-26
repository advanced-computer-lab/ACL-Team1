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

    const [editFormData, setFormData] = useState({
        flightNumber: null,
        cabin: "",
        childrenSeatsReserved: null,
        adultsSeatsReserved: null,
    });

    function editForm(event) {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setFormData(newFormData);
    }

    function handleEditFormSubmit(event, id) {
        event.preventDefault();

        console.log(id);
        const editedReservation = {
            bookingNumber: editReservationBookingNumber,
            flightNumber: editFormData.flightNumber,
            cabin: editFormData.cabin,
            childrenSeatsReserved: editFormData.childrenSeatsReserved,
            adultsSeatsReserved: editFormData.adultsSeatsReserved,
        }

        axios.put(`/users/updateReservation/${id}`, editedReservation)
            .then(() => fetchReservedFlights())
            .catch(err => console.log(err))



        const newReservations = [...reservedFlights];

        const index = reservedFlights.findIndex((reservation) => reservation.bookingNumber === editReservationBookingNumber);

        newReservations[index] = editedReservation;

        setReservedFlights(newReservations);
        setReservationBookingNumber(null);

        // axios.delete(`/reservations/cancelReservation/${id}`).then(()=>{setReservedFlights((currentFlights)=>currentFlights.filter((flight)=>flight._id!==id))})
        // navigate('/flightsSchedule')
    }

    
    


    const [editReservationBookingNumber, setReservationBookingNumber] = useState(null);

    // const loadUserFromStorage = async () => {
    //     const savedUser = await localStorage.getItem('token');
    //     setUser(JSON.parse(savedUser))
    // }
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


        // axios.delete(`/reservations/cancelReservation/${id}`).then(()=>{setReservedFlights((currentFlights)=>currentFlights.filter((flight)=>flight._id!==id))})
        // navigate('/flightsSchedule')
    }
    useEffect(() => {
        loadUserFromStorage()
    }, []);


    function returnToHome() {
        navigate('/')
    }

    function editReservation(event, reservation) {
        event.preventDefault();
        setReservationBookingNumber(reservation.bookingNumber);

        const formValues = {
            flightNumber: reservation.flightNumber,
            cabin: reservation.cabin,
            childrenSeatsReserved: reservation.childrenSeatsReserved,
            adultsSeatsReserved: reservation.adultsSeatsReserved,
        }

        setFormData(formValues);
        
    }

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

    return (
        <Container><br/>
        
        {localStorage.getItem('user') != null && reservedFlights.length > 0 ? <><div></div>
        :<br /><div className="row">
            {reservedFlights.map((reservation, key) => (
                 <>  {editReservationBookingNumber === reservation.bookingNumber ?
                    <form onSubmit={(event) => handleEditFormSubmit(event, editReservationBookingNumber)}>
                        <div className="col-lg-4 pb-1">
                            <div id="edit-card" className="card shadow mb-5 bg-white rounded">
                                <div id="card_body" className="card-body">
                                    <h5>Flight number:</h5>
                                    <input
                                        text="text"
                                        required="required"
                                        placeholder="Enter flight number"
                                        name="flightNumber"
                                        value={editFormData.flightNumber}
                                        onChange={editForm}
                                    /><br /><br />
                                    <h5>Cabin :</h5>
                                    <input
                                        text="text"
                                        required="required"
                                        placeholder="Enter cabin class"
                                        name="cabin"
                                        value={editFormData.cabin}
                                        onChange={editForm}
                                    /><br /><br />
                                    <h5>Number of seats for children:</h5>
                                    <input
                                        text="text"
                                        required="required"
                                        placeholder="Enter number of seats for children"
                                        name="childrenSeatsReserved"
                                        value={editFormData.childrenSeatsReserved}
                                        onChange={editForm}
                                    /><br /><br />
                                    <h5>Number of seats for adults:</h5>
                                    <input
                                        text="text"
                                        required="required"
                                        placeholder="Enter number of seats for adults"
                                        name="adultsSeatsReserved"
                                        value={editFormData.adultsSeatsReserved}
                                        onChange={editForm}
                                    /><br /><br />
                                    <button className="btn btn-primary" type="submit">Save</button>&nbsp;&nbsp;
                                    <button className="btn btn-secondary">Back</button>
                                </div>
                            </div>
                        </div> &nbsp;&nbsp;</form>:
                (<div class="pricing-column col-lg-4 pb-1" key={reservation.flightNumber}>
                <div id="flight-card" className="card shadow mb-5 bg-white rounded" key={reservation.flightNumber}>
                    <div className="card-header">
                        <h3 id="flight-number">Booking Number: {reservation.bookingNumber}</h3>
                    </div>
                    <div class="card-body">
                        <p id="passport-number-reservation"><Icon icon="mdi:passport" width="25" height="25"/>&nbsp;Passport Number: {reservation.passportNumber}</p>
                        <p id="arrival-date-time"><Icon icon="fluent:airplane-20-filled" width="27" height="27"/>&nbsp;Flight Number: {reservation.flightNumber}</p>
                        <p id="eco-seats"><Icon icon="zmdi:airline-seat-recline-extra" width="25" height="25" />&nbsp;Cabin: {reservation.cabin}</p>
                        <p id="bus-seats"><Icon icon="healthicons:child-program" hFlip={true} width="40" height="40"/>&nbsp;Reserved seats for children: {reservation.childrenSeatsReserved}</p>
                        <p id="bus-seats"><Icon icon="el:adult" width="22" height="22"/>&nbsp;Reserved seats for adults: {reservation.adultsSeatsReserved}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;<button id="edit-reservation" className="btn btn-warning" onClick={(event) => editReservation(event, reservation)}>Edit Reservation</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button id="cancel-reservation" className="btn btn-danger" onClick={() => cancelFlight(reservation.bookingNumber)}>Cancel Reservartion</button>
                        
                        
                    </div>
                </div>

                </div>
                  
                  )}
                  </>
              ))}
          </div></> : <div><h3>No reserved flights.</h3></div>}<br />
          <button className="btn btn-secondary" onClick={returnToHome}>Return to Home page</button>&nbsp;&nbsp;&nbsp;

            </Container>
            
        
    )
}

export default MyBookings
