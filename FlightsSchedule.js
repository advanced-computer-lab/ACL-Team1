import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import "../App.css";
// import spinner from '../spinner.gif';
import { useNavigate } from 'react-router-dom';








function FlightsSchedule() {

    let navigate = useNavigate();

    const [reservedFlights, setReservedFlights] = useState([])
    const [user, setUser] = useState();

    const loadUserFromStorage = async () => {
        const savedUser = await localStorage.getItem('user');
        setUser(JSON.parse(savedUser))
    }
    const fetchReservedFlights = () => {
        axios.get('/reservations/reservedFlights')
            .then(res => setReservedFlights(res.data))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        fetchReservedFlights();
    }, []);


    const cancelFlight=(id)=>{
        console.log(id)
        const body = { bookingNumber: id }
        axios.put(`/users/cancel/`, body)
          .then(() => fetchReservedFlights())
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


    return (

        <Container><br />

            {reservedFlights.length > 0 ? <><h3 className="flight-schedule">Flights Schedule:</h3><br /><div className="row"  >
                {reservedFlights.map((reservation, key) => (
                    <div className="col-lg-4 pb-1" key={reservation.flightNumber}>
                        <div className="card" key={reservation.flightNumber}>
                            <div className="card-body">
                                <h5 id="booking-number" className="card-title">Booking Number: {reservation.bookingNumber + 1}</h5><br />
                                <h6 className="card-subtitle mb-2 ">User Number: {reservation.userNumber}</h6>
                                <h6 className="card-subtitle mb-2 ">Flight Number: {reservation.reservationNumber}</h6>
                                <h6 className="card-subtitle mb-2 ">Reserved Seats: {reservation.seatsReserved}</h6><br />
                                <button className="btn btn-danger" onClick={() => cancelFlight(reservation.bookingNumber)}>Cancel Reservation</button>
                            </div>
                        </div>
                    </div>

                ))}
            </div></> : <div><h3>No reserved flights.</h3></div>}<br />
            <button className="btn btn-secondary" onClick={returnToHome}>Return to Home page</button>&nbsp;&nbsp;&nbsp;

        </Container>
    )

}

export { FlightsSchedule }
