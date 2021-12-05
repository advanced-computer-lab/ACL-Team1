import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import "../App.css";




function Flight() {

    let navigate = useNavigate();

    const [flight, setFlight] = useState({})
    const [user, setUser] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [cabin, setCabin] = useState('');
    const [seatsReserved, setSeatsReserved] = useState(null);
    const { id } = useParams()

    const loadUserFromStorage = async () => {
        const savedUser = await localStorage.getItem('user');
        setUser(JSON.parse(savedUser))
    }

    useEffect(() => {
        axios.get(`/flights/${id}`).then(response => setFlight(response.data))
    }, [id]);


    useEffect(() => {
        loadUserFromStorage()
    }, []);

    const goBack = () => {
        navigate(-1)
    }

    const confirmReservation = () => {
        if (user) {
            const body = { userNumber: user.userNumber, flightNumber: flight.flightNumber, cabin, seatsReserved }
            axios.put("/users/reserve/", body).then(() => navigate(`/confirmedReservation/${1}`))
        }
        else setErrorMessage('Please login to reserve');

    }

    function goToLogin() {
        navigate('/login')
    }

    return (

        <div><br />
            
            <Container>
                {errorMessage && <><h2 className="error-message">*{errorMessage}*</h2>&nbsp;<button onClick={goToLogin}className="btn btn-primary">Go to Login page</button></>}<br/><br/>
                <div className="row" ><div className="col-lg-4 pb-1" key={flight.flightNumber} ><div class="card bg-light mb-3" style={{ "max-width": "18rem" }}>
                    <div class="card-header "><h4>Flight {flight.flightNumber} Details</h4></div>
                    <div class="card-body">
                        <h6 className="card-subtitle mb-2 text-black">Departure Airport : {flight.departureAirport} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Arrival Airport: {flight.arrivalAirport} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Baggage Allowance: {flight.baggageAllowance} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Trip Duration: {flight.tripDuration} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Number of Economy Seats Available: {flight.eSeatsAvailable} </h6>
                            <h6 className="card-subtitle mb-2 text-black">Number of Buisness Seats Available: {flight.bSeatsAvailable} </h6><br />
                        <form autoComplete="off" >
                            <div className="form-group" >
                                <label htmlFor="cabin">Cabin: </label>
                                <input
                                    type="text"
                                    name="cabin"
                                    value={cabin}
                                    required="true"
                                    className="form-control"
                                    placeholder="Choose cabin class"
                                    onChange={e => setCabin(e.target.value)}

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="seatsReserved">Number of seats: </label>
                                <input
                                    type="text"
                                    name="seatsReserved"
                                    value={seatsReserved}
                                    required="true"
                                    className="form-control"
                                    placeholder="Enter number of seats"
                                    onChange={e => setSeatsReserved(e.target.value)}

                                />
                            </div>
                        </form><br />
                        {/* <h6 className="card-subtitle mb-2 text-black">Cabin class: <input className="cabin-class"
                        type ="text"
                        placeholder="Enter cabin class" value={cabin}
                        onChange={e => setCabin(e.target.value)}
                        ></input> </h6>

                        <h6 className="card-subtitle mb-2 text-black">Number of seats: <input className="number-of-seats"
                        type ="text"
                        placeholder="Enter number of seats" value={seatsReserved}
                        onChange={e => setSeatsReserved(Number(e.target.value))}
                        ></input> </h6><br/> */}
                        <div className="form-group">
                            <button type="submit" id="reserve_flight" className="btn btn-dark col-lg-5 mx-1 mb-1 text-white" data-bs-toggle="modal" data-bs-target="#confirmModal">Reserve</button>

                            <button type="submit" id="back" className="btn btn-dark col-lg-5 mx-1 mb-1 text-white" onClick={goBack}>Back</button>
                        </div>

                    </div>
                </div></div></div></Container>
            <div className="modal" tabIndex="-1" role="dialog" id='confirmModal'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Chosen Flight Summary</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div>
                                <div class="card">
                                    <div class="card-header">
                                        Flight Details
                                    </div>
                                    <div class="card-body">
                                        <h6 className="card-subtitle mb-2 text-black">Flight Number: {flight.flightNumber} </h6>
                                        <h6 className="card-subtitle mb-2 text-black">From: {flight.from} </h6>
                                        <h6 className="card-subtitle mb-2 text-black">To: {flight.to} </h6>
                                        <h6 className="card-subtitle mb-2 text-black">Departure Date: {flight.departureDate} </h6>
                                        {/* if(cabin === "Economy" || cabin === "economy"){
                                            <div><h6 className="card-subtitle mb-2 text-black">Price: {flight.eSeatsPrice} EGP </h6></div>
                                        } else if(cabin === "Buisness" || cabin === "buisness") {

                                            <div><h6 className="card-subtitle mb-2 text-black">Price: {flight.bSeatsPrice} EGP </h6></div>
                                        } else {
                                            <div><h6 className="card-subtitle mb-2 text-black">Cabin class doesn't exist</h6></div>
                                        }} */}
                                        {cabin === "Economy" || cabin === "economy" ? <h6 className="card-subtitle mb-2 text-black">Price: {flight.eSeatsPrice} EGP </h6> :
                                            <h6 className="card-subtitle mb-2 text-black">Price: {flight.bSeatsPrice} EGP </h6>}
                                    </div>
                                </div><br />
                                <div class="card">
                                    <div class="card-header">
                                        User Details
                                    </div>
                                    <div class="card-body">
                                        <h6 className="card-subtitle mb-2 text-black">Cabin: {cabin} </h6>
                                        <h6 className="card-subtitle mb-2 text-black">Reserved Seats: {seatsReserved} </h6>
                                    </div>
                                </div><br />
                                <div>
                                    <h5 id="prompt" className="card-subtitle mb-2 text-black">Would you like to confirm your reservation?</h5>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={confirmReservation} data-bs-dismiss="modal">Confirm</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default Flight