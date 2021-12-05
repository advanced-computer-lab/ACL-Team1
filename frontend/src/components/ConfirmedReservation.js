import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap'
import "../App.css";

const ConfirmedReservation = () => {
    const navigate = useNavigate();
    // const { booking } = useParams();
    const viewBookingsClick = () => {
        navigate('/flightsSchedule')
    }
    return (<Container>
        <div className="col-lg-4 pb-1">
            <div class="card">
                <div class="card-body">
                    <h3 id="confirmed-reservation" class="card-title">Your booking is confirmed!</h3><br/><br/>
                    {/* <p class="card-text">Booking Number: {booking}</p> */}
                    <button className="btn btn-primary" onClick={viewBookingsClick}>View all bookings</button>
                </div>
            </div>
        </div>
    </Container>)
}

export default ConfirmedReservation;