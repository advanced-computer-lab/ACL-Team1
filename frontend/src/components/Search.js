import React, { useState, Fragment, useRef } from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faPlane} from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react';



// import { useNavigate } from 'react-router-dom';

const Search = ({ onFlightsChange }) => {
  const departureCity = useRef("");
  const destinationCity = useRef("");
  const departureDate = useRef("");
  const departureTime = useRef("");
  const arrivalDate = useRef("");
  const arrivalTime = useRef("");
  const eSeatsAvailable = useRef("");
  const bSeatsAvailable = useRef("");
  // const cabinClass = useRef("");
  // const numOfPassengers = useRef("");

  const [flights, setFlights] = useState([]);

  function handleClick() {
    console.log("Button clicked");
    var body = {};
    
    
    if (departureCity.current.value !== "") {
      body["from"] = departureCity.current.value;
      
    }

    if (destinationCity.current.value !== "") {
      body["to"] = destinationCity.current.value;
    }

    if (departureDate.current.value !== "") {
      body["departureDate"] = departureDate.current.value;
    }

    if (arrivalDate.current.value !== "") {
      body["arrivalDate"] = arrivalDate.current.value;
    }

    if (departureTime.current.value !== "") {
      body["departureTime"] = departureTime.current.value;
    }

    if (arrivalTime.current.value !== "") {
      body["arrivalTime"] = arrivalTime.current.value;
    }

    if (eSeatsAvailable.current.value !== "") {
      body["eSeatsAvailable"] = eSeatsAvailable.current.value;
    }

    if (bSeatsAvailable.current.value !== "") {
      body["bSeatsAvailable"] = bSeatsAvailable.current.value;
    }


    axios
      .post("/flights/find", body)

      .then((res) => {
        console.log(res.data);
        setFlights(res.data);
        onFlightsChange(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Fragment>
      <Container>
    <div id="search-form-card" class="card shadow mb-5 bg-white rounded">
        <div id="search-form-card-body" className="card-body">
            <p id="search-form-title" class="card-title text-center shadow mb-5 rounded">Find your flight&nbsp;< FontAwesomeIcon icon = {faPlane} color="blue" /></p>
        </div>
        <div class="row">
            <div class="col-sm-6">
            
                <Icon icon="tabler:plane-departure" width="28" height="28"/>
                <select className="browser-default custom-select mb-4" id="select" ref={departureCity}>
                    <option id="departure-city" value="" disabled="" selected="">Departure City</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Paris">Paris</option>

                </select>
              
            </div>
            <div class="col-sm-6">
                <Icon icon="tabler:plane-arrival" width="28" height="28"/>
                <select class="browser-default custom-select mb-4" id="select" ref={destinationCity}>
                    <option id="destination-city" value="" disabled="" selected="">Destination City</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Paris">Paris</option>
                </select>
            </div>
            <div class="row">
                <div class="col-sm-6">
                <Icon icon="fe:calendar" width="28" height="28"/>
                <input 
                placeholder="Departure Date" 
                type="text" id="date-picker" 
                class="form-control datepicker mb-4" 
                ref={departureDate}
                />
                </div>
                <div class="col-sm-6">
                
                <Icon icon="fe:calendar" width="28" height="28"/>
                <input 
                placeholder="Arrival Date" 
                type="text" 
                id="date-picker" 
                class="form-control datepicker mb-4" 
                ref={arrivalDate}
                />
                </div>
            </div>    
            <div class="row mt-4">
                    <div class="col-sm-6">
                    <Icon icon="jam:clock-f" width="28" height="28"/>
                      <select class="browser-default custom-select mb-4" id="select" ref={departureTime}>
                            <option id="departure-time" value="" disabled="" selected="">Departure Time</option>
                            <option value="14:00">14:00</option>
                            <option value="13:30">13:30</option>
                            <option value="1:00">1:00</option>
                      </select>
                    </div>
                
                <div class="col-sm-6">
                <Icon icon="jam:clock-f" width="28" height="28"/>
                      <select class="browser-default custom-select mb-4" id="select" ref={arrivalTime}>
                            <option id="departure-time" value="" disabled="" selected="">Arrival Time</option>
                            <option value="16:00">16:00</option>
                            <option value="15:30">15:30</option>
                            <option value="3:00">3:00</option>
                        </select>
                    </div><br/><br/>
                </div>
                <div class="row mt-4">
                    <div class="col-sm-6">
                    <Icon icon="zmdi:airline-seat-recline-extra" height="28" width="28"/>
                        <select class="browser-default custom-select mb-4" id="select" ref={eSeatsAvailable}>
                            <option id="eco-seats-available" value="" disabled="" selected="">Economy Seats Available</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                    <Icon icon="zmdi:airline-seat-recline-extra" height="28" width="28"/>
                        <select class="browser-default custom-select mb-4" id="select" ref={bSeatsAvailable} >
                            <option id="bus-seats-available" value="" disabled="" selected="">Business Seats Available</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                        </select>
                    </div>
                    
                </div>   
                <div class="mt-4 d-flex justify-content-end">
                <button className="btn btn-primary custom-button" onClick={handleClick}>Search</button><br/>
                </div>

                </div>
            </div><br/>
            
</Container>

    </Fragment>
  );
};

export { Search };
