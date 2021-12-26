import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import "../App.css";
import StripeCheckout from 'react-stripe-checkout'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlane} from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react';
// import jwt from 'jsonwebtoken'




function Flight() {

    let navigate = useNavigate();



    const [flight, setFlight] = useState({})
    const [user, setUser] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [cabin, setCabin] = useState('');
    const [childrenSeatsReserved, setChildrenSeatsReserved] = useState(null);
    const [adultsSeatsReserved, setAdultsSeatsReserved] = useState(null);
    const { id } = useParams()

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if(token) {
    //         const user = jwt.decode(token)
    //         if(!user) {
    //             localStorage.removeItem('token')
    //             navigate('/login')
    //         } else {
    //             // populateReservation();
                
    //         }
    //     }
    // }, [])

    const loadUserFromStorage = async () => {
        const savedUser = await localStorage.getItem('user');
        setUser(JSON.parse(savedUser))
    }

    
    useEffect(() => {
        loadUserFromStorage()
    }, []);

    useEffect(() => {
        axios.get(`/flights/${id}`).then(response => setFlight(response.data))
    }, [id]);



    function goBack() {
        navigate(-1)
    }
    

    function goToLogin() {
        navigate('/login')
    }

    function handleToken(token) {
        console.log({ token })
        if (user) {
            const body = { passportNumber: user.passportNumber, flightNumber: flight.flightNumber, cabin, childrenSeatsReserved, adultsSeatsReserved }
            axios.put("/users/reserve/", body).then(() => navigate(`/confirmedReservation`))
        }
        else 
        setErrorMessage('Please login to reserve');
    } 

    return (

        <div><br />

<Container>
    <div id="search-form-card" class="card shadow mb-5 bg-white rounded">
        <div id="search-form-card-body" className="card-body">
            <p id="search-form-title" class="card-title text-center shadow mb-5 rounded">Flight Details&nbsp;< FontAwesomeIcon icon = {faPlane} color="blue" /></p>
        </div>
         <div class="row">
            <div class="col-sm-6">
              <h6 className="card-subtitle mb-2 text-black"><Icon icon="carbon:airport-01" width="28" height="28"/>&nbsp;Departure Airport: {flight.departureAirport} </h6>
            </div>
            <div class="col-sm-6">
              <h6 className="card-subtitle mb-2 text-black"><Icon icon="carbon:airport-01" width="28" height="28"/>&nbsp;Arrival Airport: {flight.arrivalAirport} </h6>
            </div>
         </div>   
         
            <div class="row">
                <div class="col-sm-6">
                <h6 className="card-subtitle mb-2 text-black"><Icon icon="icon-park:baggage-delay" width="28" height="28"/>&nbsp;Baggage Allowance: {flight.baggageAllowance} </h6>
                </div>
                <div class="col-sm-6">
                <h6 className="card-subtitle mb-2 text-black"><Icon icon="jam:clock-f" width="28" height="28"/>&nbsp;Trip Duration: {flight.tripDuration} </h6>
                </div>
            </div>   
            
            <div class="row">
              <div class="col-sm-6">
                <h6 className="card-subtitle mb-2 text-black"><Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp;Number of Economy Seats Available: {flight.eSeatsAvailable} </h6>
              </div> 
              <div class="col-sm-6">
                <h6 className="card-subtitle mb-2 text-black"><Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp;Number of Business Seats Available: {flight.bSeatsAvailable} </h6>
              </div> 
            </div>
            <div class="row mt-4">
                    <div class="col-sm-6">
                    {/* <Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp; */}
                      <select class="browser-default custom-select mb-4" id="select" name="childrenSeatsReserved" onChange={e => setChildrenSeatsReserved(e.target.value)} >
                            <option id="seats-for-children" value="" disabled="" selected="">Number of Seats for Children</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                      </select>
                    </div>
                
                <div class="col-sm-6">
                {/* <Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp; */}
                      <select class="browser-default custom-select mb-4" id="select" name="adultsSeatsReserved" onChange={e => setAdultsSeatsReserved(e.target.value)}>
                            <option id="seats-for-adults" value="" disabled="" selected="">Number of Seats for Adults</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div><br/><br/>
                </div>
                <div class="row mt-4">
                    <div class="col-sm-6">
                    {/* <Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp; */}
                        <select class="browser-default custom-select mb-4" id="select" name="cabin" onChange={e => setCabin(e.target.value)} >
                            <option id="cabin-class" value="" disabled="" selected="">Cabin</option>
                            <option value="Economy">Economy</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                    <div class="col-sm-6">

                    </div>
                    
                </div>   
                <div class="mt-4 d-flex justify-content-end">
                {localStorage.getItem('user') != null 
                ? <><button type="submit" className="btn btn-dark custom-button" data-bs-toggle="modal" data-bs-target="#confirmModal">Book Flight</button>&nbsp;&nbsp;
                  <button type="submit" id="back" className="btn btn-dark custom-button" onClick={goBack}>Back</button><br/></>
                : <><button type="submit" id="back" className="btn btn-dark custom-button" onClick={goBack}>Back</button><br/></>}    
                
                </div>

                
            </div><br/>
            
</Container>
{/*             
            <Container>
                
                <div className="row" ><div className="col-lg-4 pb-1" key={flight.flightNumber} ><div class="card bg-light mb-3" style={{ "max-width": "18rem" }}>
                    <div class="card-header "><h4>Flight {flight.flightNumber} details</h4></div>
                    <div class="card-body">
                        <h6 className="card-subtitle mb-2 text-black">Departure airport : {flight.departureAirport} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Arrival airport: {flight.arrivalAirport} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Baggage allowance: {flight.baggageAllowance} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Trip duration: {flight.tripDuration} </h6>
                        <h6 className="card-subtitle mb-2 text-black">Number of economy Seats Available: {flight.eSeatsAvailable} </h6>
                            <h6 className="card-subtitle mb-2 text-black">Number of business Seats Available: {flight.bSeatsAvailable} </h6><br />
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
                                <label htmlFor="childrenSeatsReserved">Number of seats for children: </label>
                                <input
                                    type="text"
                                    name="childrenSeatsReserved"
                                    value={childrenSeatsReserved}
                                    required="true"
                                    className="form-control"
                                    placeholder="Enter number of seats for children"
                                    onChange={e => setChildrenSeatsReserved(e.target.value)}

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="adultsSeatsReserved">Number of seats for adults: </label>
                                <input
                                    type="text"
                                    name="adultsSeatsReserved"
                                    value={adultsSeatsReserved}
                                    required="true"
                                    className="form-control"
                                    placeholder="Enter number of seats for adults"
                                    onChange={e => setAdultsSeatsReserved(e.target.value)}

                                />
                            </div>
                        </form><br />
                        <div className="form-group">
                            <button type="submit" id="reserve_flight" className="btn btn-dark col-lg-5 mx-1 mb-1 text-white" data-bs-toggle="modal" data-bs-target="#confirmModal">Reserve</button> 

                            <button type="submit" id="back" className="btn btn-dark col-lg-5 mx-1 mb-1 text-white" onClick={goBack}>Back</button>
                            
                        </div><br/>
                        {errorMessage && <><h4 className="error-message">*{errorMessage}*</h4>&nbsp;<button onClick={goToLogin}className="btn btn-primary">Go to Login page</button></>}<br/><br/>

                    </div>
                </div></div></div></Container> */}
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
                                        {cabin === "Economy" || cabin === "economy" ? <h6 className="card-subtitle mb-2 text-black">Price: {(flight.eSeatsPrice * adultsSeatsReserved) + (flight.eSeatsPrice * childrenSeatsReserved * 0.5)} EGP </h6> :
                                            <h6 className="card-subtitle mb-2 text-black">Price: {(flight.bSeatsPrice * adultsSeatsReserved) + (flight.bSeatsPrice * childrenSeatsReserved * 0.5)} EGP </h6>}
                                    </div>
                                </div><br />
                                <div class="card">
                                    <div class="card-header">
                                        User Details
                                    </div>
                                    <div class="card-body">
                                        <h6 className="card-subtitle mb-2 text-black">Cabin: {cabin} </h6>
                                        <h6 className="card-subtitle mb-2 text-black">Reserved seats for children: {childrenSeatsReserved} </h6>
                                        <h6 className="card-subtitle mb-2 text-black">Reserved seats for adults: {adultsSeatsReserved} </h6>
                                    </div>
                                </div><br />
                                <div>
                                    <h5 id="prompt" className="card-subtitle mb-2 text-black">Would you like to proceed to payment?</h5>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-success" onClick={confirmReservation} data-bs-dismiss="modal">Confirm</button> */}
                            <StripeCheckout
                               stripeKey="pk_test_51K6cwJLUlGbhuxaGv5dFIV0WW2XiuUabaGS4AgN2IKik8fjf91poZtWZB2uUBimXHpsyNRGlpmBl35roDwbbac9P00toU71y4Y"
                               token={handleToken}
                            />
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default Flight