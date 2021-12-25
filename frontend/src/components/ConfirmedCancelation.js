import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap'
import "../App.css";



function ConfirmedCancelation() {

    const navigate = useNavigate();
    // const { booking } = useParams();
    const viewBookingsClick = () => {
        navigate('/allBookings')
    }

    return(
        <Container><br/>
        <div className="col-lg-4 pb-1">
            <div class="card shadow mb-5 bg-white rounded">
                <div class="card-body">
                    <h3 id="confirmed-reservation" class="card-title">Booking is canceled successfully!</h3><br/><br/>
                    {/* <p class="card-text">Booking Number: {booking}</p> */}
                    <button className="btn btn-primary" onClick={viewBookingsClick}>View all bookings</button>
                </div>
            </div>
        </div>
    </Container>
    )

}

export default ConfirmedCancelation