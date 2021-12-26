import React, {useState,useEffect,Fragment} from "react";
import {Container, Carousel} from "react-bootstrap";
import "../App.css";
import axios from 'axios'
import {Search} from './Search'
import {useNavigate} from "react-router-dom";
import image1 from '../airplane-inside1.jpg'
import image2 from '../airplane-image2.jpg'
import image3 from '../airplane-image3.jpg'
import image4 from '../airplane-inside2.jpg'
import image5 from '../airplane-inside3.jpg'
import image6 from '../airplane-inside4.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faChair, faPlane, faPlaneArrival, faPlaneDeparture} from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react';
// import spinner from '../spinner.gif'




function Home() {

    let navigate = useNavigate();

    
    const[user, setUser] = useState();
    const [flightNumber, setFlightNumber] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [departureAirport, setDepartureAirport] = useState("");
    const [departureTerminal, setDepartureTerminal] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [arrivalTerminal, setArrivalTerminal] = useState("");
    const [eSeatsAvailable, setEconomySeatsAvailable] = useState("");
    const [bSeatsAvailable, setBusinessSeatsAvailable] = useState("");
    const [eSeatsPrice, setEconomySeatsPrice] = useState("");
    const [bSeatsPrice, setBusinessSeatsPrice] = useState("");
    const [tripDuration, setTripDuration] = useState("");
    const [baggageAllowance, setBaggageAllowance] = useState("");

    const onSubmit = e => {
        // e.preventDefault();

        const flight = {
            flightNumber,
            from,
            to,
            departureDate,
            departureTime,
            departureAirport,
            departureTerminal,
            arrivalDate,
            arrivalTime,
            arrivalAirport,
            arrivalTerminal,
            eSeatsAvailable,
            bSeatsAvailable,
            eSeatsPrice,
            bSeatsPrice,
            tripDuration,
            baggageAllowance
        };



        setFlightNumber("")
        setFrom("")
        setTo("")
        setDepartureDate("")
        setDepartureTime("")
        setDepartureAirport("")
        setArrivalDate("")
        setArrivalTime("")
        setArrivalAirport("")
        setEconomySeatsAvailable("")
        setBusinessSeatsAvailable("")
        setDepartureTerminal("")
        setArrivalTerminal("")
        setEconomySeatsPrice("")
        setBusinessSeatsPrice("")
        setTripDuration("")
        setBaggageAllowance("")



        axios
            .post("/users/addFlight", flight)
            .then(res => console.log("added!"))
            .catch(err => {
                console.log(err);
            });

        alert("Flight added successfully!")
    };

    const [flights, setFlights] = useState([]);
    useEffect(() => {
        axios.get('/flights/')
            .then(res => setFlights(res.data))
            .catch(error => console.log(error));
    }, []);

    const [toggle, setToggle] = useState(false);

    const [editFlightNumber, setEditFlightNumber] = useState(null);

    const [editFormData, setFormData] = useState({
        flightNumber: null,
        departureDate: "",
        departureTime: "",
        departureAirport: "",
        arrivalDate: "",
        arrivalTime: "",
        arrivalAirport: "",
        eSeatsAvailable: null,
        bSeatsAvailable: null,

    });

    function editForm(event) {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {
            ...editFormData
        };
        newFormData[fieldName] = fieldValue;

        setFormData(newFormData);
    }

    function handleEditFormSubmit(event, id) {
        event.preventDefault();

        console.log(id);
        const editedFlight = {
            flightNumber: editFlightNumber,
            departureDate: editFormData.departureDate,
            departureTime: editFormData.departureTime,
            departureAirport: editFormData.departureAirport,
            arrivalDate: editFormData.arrivalDate,
            arrivalTime: editFormData.arrivalTime,
            arrivalAirport: editFormData.arrivalAirport,
            eSeatsAvailable: editFormData.eSeatsAvailable,
            bSeatsAvailable: editFormData.bSeatsAvailable,
        }

        axios.put(`/users/updateFlight/${id}`, editedFlight)
            .then(() => navigate(`/`))
            .catch(err => console.log(err))



        const newFlights = [...flights];

        const index = flights.findIndex((flight) => flight.flightNumber === editFlightNumber);

        newFlights[index] = editedFlight;

        setFlights(newFlights);
        setEditFlightNumber(null);

    }

    function handleAddFlight() {
        setToggle(!toggle)

    }

    function handleViewInfo(id) {
        navigate(`/flights/${id}`);
    }

    const loadUserFromStorage = async () => {
        const savedUser = await JSON.parse(localStorage.getItem('user'));
        setUser(savedUser)
    }
    
    useEffect(() => {
      loadUserFromStorage()
    }, []);

    let isAdmin 
    if(user==null){
      isAdmin = false

   }else{
     isAdmin = user.isAdmin
   }
  
    

    // function viewMyBookings(passportNumber) {
    //     navigate(`/myBookings/${passportNumber}`);
    //     console.log(passportNumber)
        
    //   }

    function handleEditFlight(event, flight) {
        event.preventDefault();
        setEditFlightNumber(flight.flightNumber);

        const formValues = {
            flightNumber: flight.flightNumber,
            from: flight.from,
            to: flight.to,
            departureDate: flight.departureDate,
            departureTime: flight.departureTime,
            departureAirport: flight.departureAirport,
            arrivalDate: flight.arrivalDate,
            arrivalTime: flight.arrivalTime,
            arrivalAirport: flight.arrivalAirport,
            eSeatsAvailable: flight.eSeatsAvailable,
            bSeatsAvailable: flight.bSeatsAvailable,
        }

        setFormData(formValues);
    }







    function handleDeleteFlight(flightNumber) {
        console.log(flightNumber);
        const body = {
            flightNumberNumber: flightNumber
        }
        axios.put(`/users/deleteFlight/`, body)
            .then(() => {
                setFlights((flights) => flights.filter((flight) => flight.flightNumber !== flightNumber))
            })
        navigate(`/`)
    }


    const onFlightsChange = (data) => {
        setFlights(data)
    }

    function goBack() {
        navigate(-1)
    }

    return ( 
    <Fragment>

<Carousel>
    
  <Carousel.Item id="carousel-item-active">
    <img
    id="image-3"
      className="d-block w-100"
      src={image3}
      alt="First slide"
    />
    <Carousel.Caption>
      <h1 id="greeting-title">Welcome to Airline Reservation</h1>
      <h3 id="greeting-body">A Great Way to Fly!</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item id="carousel-item">
    <img
      id="image-4"
      className="d-block w-100"
      src={image6}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h1 id="greeting-title">Excellence in Flight</h1>

    </Carousel.Caption>
  </Carousel.Item>

</Carousel><br/><br/>



<Container>
    <Search onFlightsChange={onFlightsChange} />
    {/* <button className="btn btn-primary" onClick={() => viewMyBookings(user.passportNumber)}>View my bookings</button> */}

    {isAdmin === true ? <> <button className="btn btn-success" onClick={handleAddFlight}>Add Flight</button><br/><br/></>: <div></div>}
    {toggle 
    ? <><div class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-8">
            
                <form onSubmit={onSubmit}>
                    <div id="search-form-card" class="card shadow mb-5 bg-white rounded">
                        <div class="container p-3">
                            <div class="input-group mb-3"> <Icon icon="tabler:plane-departure" width="28" height="28"/>&nbsp;<input type="text" name="from" class="form-control" placeholder="Departure City" onChange={e => setFrom(e.target.value)}/>&nbsp;&nbsp;<Icon icon="tabler:plane-arrival" width="28" height="28"/>&nbsp;&nbsp; <input type="text" name="to" class="form-control" placeholder="Destination City" onChange={e => setTo(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="fe:calendar" width="28" height="28"/>&nbsp;<input type="text" name="departureDate" class="form-control" placeholder="Departure Date" onChange={e => setDepartureDate(e.target.value)}/>&nbsp;&nbsp;<Icon icon="fe:calendar" width="28" height="28"/>&nbsp; <input type="text" name="arrivalDate" class="form-control" placeholder="Arrival Date" onChange={e => setArrivalDate(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="jam:clock-f" width="28" height="28"/>&nbsp;<input type="text" name="departureTime" class="form-control" placeholder="Departure Time" onChange={e => setDepartureTime(e.target.value)}/>&nbsp;&nbsp;<Icon icon="jam:clock-f" width="28" height="28"/>&nbsp;<input type="text" name="arrivalTime" class="form-control" placeholder="Arrival Time" onChange={e => setArrivalTime(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="carbon:airport-01" width="28" height="28"/>&nbsp;<input type="text" name="departureAirport" class="form-control" placeholder="Departure Airport" onChange={e => setDepartureAirport(e.target.value)}/>&nbsp;&nbsp;<Icon icon="carbon:airport-01" width="28" height="28"/>&nbsp; <input type="text" name="arrivalAirport" class="form-control" placeholder="Arrival Airport" onChange={e => setArrivalAirport(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="fluent:book-number-16-regular" width="28" height="28"/>&nbsp;<input type="text" name="departureTerminal" class="form-control" placeholder="Departure Terminal" onChange={e => setDepartureTerminal(e.target.value)}/>&nbsp;&nbsp;<Icon icon="fluent:book-number-16-regular" width="28" height="28"/>&nbsp; <input type="text" name="arrivalTerminal" class="form-control" placeholder="Arrival Terminal" onChange={e => setArrivalTerminal(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp;<input type="text" name="eSeatsAvailable" class="form-control" placeholder="Economy Seats" onChange={e => setEconomySeatsAvailable(e.target.value)}/>&nbsp;&nbsp;<Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp; <input type="text" name="bSeatsAvailable" class="form-control" placeholder="Business Seats" onChange={e => setBusinessSeatsAvailable(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="dashicons:money-alt" width="28" height="28"/>&nbsp;<input type="text" name="eSeatsPrice" class="form-control" placeholder="Economy Seats Price" onChange={e => setEconomySeatsPrice(e.target.value)}/>&nbsp;&nbsp;<Icon icon="dashicons:money-alt" width="28" height="28"/>&nbsp; <input type="text" name="bSeatsPrice" class="form-control" placeholder="Business Seats Price" onChange={e => setBusinessSeatsPrice(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="jam:clock-f" width="28" height="28"/>&nbsp;<input type="text" name="tripDuration" class="form-control" placeholder="Trip Duration" onChange={e => setTripDuration(e.target.value)}/>&nbsp;&nbsp;<Icon icon="icon-park:baggage-delay" width="28" height="28"/>&nbsp; <input type="text" name="baggageAllowance" class="form-control" placeholder="Baggage Allowance" onChange={e => setBaggageAllowance(e.target.value)}/> </div>
                            <div class="input-group mb-3"> <Icon icon="fluent:book-number-16-regular" width="28" height="28"/>&nbsp;<div class="col-sm-5"><input type="text" name="flightNumber" class="form-control" placeholder="Flight Number" onChange={e => setFlightNumber(e.target.value)}/></div></div>
                            {/* <div class="col-sm-6"> <Icon icon="fluent:book-number-16-regular" width="28" height="28"/>&nbsp;<input type="text" name="flightNumber" class="form-control" placeholder="Flight Number" onChange={e => setFlightNumber(e.target.value)}/></div> */}
                            <div class="mt-4 d-flex justify-content-end"> <button class="btn btn-primary custom-button px-5">Save</button> </div>
                        </div>
                        
                    </div>    
                </form>
            
        </div>
    </div><br/>
</div><br/><br/><br/></>: null }

    {!flights.length > 0 ? <div><h3>No flights available</h3></div> :
    <>
      <h2 className="section-heading">Book your flight now!</h2>
      <p className="section-par">Travel the globe, make your dreams come true</p><br/>
      <div className="row">
          {flights.map((flight, key) => (
              <>
                {
                    editFlightNumber === flight.flightNumber ?
                    <form onSubmit={(event) => handleEditFormSubmit(event, editFlightNumber)}>
                        <div className="col-lg-4 pb-1">
                            <div id="edit-card" className="card">
                                <div id="card-body" className="card-body">
                                    <h5>Flight Number: </h5>
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter flight number"
                                       name="flightNumber"
                                       value={editFormData.flightNumber}
                                       onChange={editForm}
                                    />
                                    <h5>Departure Date: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter departure date"
                                       name="departureDate"
                                       value={editFormData.departureDate}
                                       onChange={editForm}
                                    />
                                    <h5>Departure Time: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter departure time"
                                       name="departureTime"
                                       value={editFormData.departureTime}
                                       onChange={editForm}
                                    />
                                    <h5>Departure Airport: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter departure airport"
                                       name="departureAirport"
                                       value={editFormData.departureAirport}
                                       onChange={editForm}
                                    />
                                    <h5>Arrival Date: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter arrival date"
                                       name="arrivalDate"
                                       value={editFormData.arrivalDate}
                                       onChange={editForm}
                                    />
                                    <h5>Arrival Time: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter arrival time"
                                       name="arrivalTime"
                                       value={editFormData.arrivalTime}
                                       onChange={editForm}
                                    />
                                    <h5>Arrival Airport: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter arrival airport"
                                       name="arrivalAirport"
                                       value={editFormData.arrivalAirport}
                                       onChange={editForm}
                                    />
                                    <h5>Economy Seats Available: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter number of economy seats"
                                       name="eSeatsAvailable"
                                       value={editFormData.eSeatsAvailable}
                                       onChange={editForm}
                                    />
                                    <h5>Business Seats Available: </h5>                                    
                                    <input
                                       text="text"
                                       required="required"
                                       placeholder="Enter number of business seats"
                                       name="bSeatsAvailable"
                                       value={editFormData.bSeatsAvailable}
                                       onChange={editForm}
                                    /><br/><br/>
                                    <button className="btn btn-primary" type="submit">Save</button>&nbsp;&nbsp;
                                    <button className="btn btn-secondary" onClick={goBack}>Back</button>
                                </div>
                            </div>
                        </div>&nbsp;&nbsp;
                    </form> 
                    : 

                            <div class="pricing-column col-lg-4 pb-1" key={flight.flightNumber}>
                                <div id="flight-card" className="card shadow mb-5 bg-white rounded" key={flight.flightNumber}>
                                    <div className="card-header">
                                        <h3 id="flight-number">Flight {flight.flightNumber}&nbsp;< FontAwesomeIcon icon = {faPlane} /></h3>
                                    </div>
                                    <div class="card-body">
                                        <h2 class="price-text">{flight.eSeatsPrice}EGP/{flight.bSeatsPrice}EGP</h2>
                                        <p id="from"><Icon icon="tabler:plane-departure" width="28" height="28"/>&nbsp;From: {flight.from}</p>
                                        <p id="to"><Icon icon="tabler:plane-arrival" width="28" height="28"/>&nbsp;To: {flight.to}</p>
                                        <p id="departure-date-time"><Icon icon="fe:calendar" width="28" height="28"/>&nbsp;Departure Date & Time: {flight.departureDate}/{flight.departureTime}</p>
                                        <p id="arrival-date-time"><Icon icon="fe:calendar" width="28" height="28"/>&nbsp;Arrival date & Time: {flight.arrivalDate}/{flight.arrivalTime}</p>
                                        <p id="eco-seats"><Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp;Economy Seats Available: {flight.eSeatsAvailable}</p>
                                        <p id="bus-seats"><Icon icon="zmdi:airline-seat-recline-extra" width="28" height="28"/>&nbsp;Business Seats Available : {flight.bSeatsAvailable}</p>
 

                                        {isAdmin === true 
                                        ? <button className="btn btn-warning col-lg-5 mx-1 mb-1" onClick={(event) => handleEditFlight(event, flight)}>Edit</button>
                                        :<div></div> }&nbsp;
                                        {isAdmin === true 
                                        ? <button className="btn btn-danger col-lg-5 mx-1 mb-1" onClick={() => handleDeleteFlight(flight.flightNumber)}>Delete</button>
                                        :<div></div> }&nbsp;
                                        <button className="btn btn-info col-lg-5 mx-1 mb-1" onClick={() => handleViewInfo(flight._id)}>View More Info</button>&nbsp;

                                    </div>
                                </div>

                            </div>
                        // </div>    

                    }
              </>
          ))}
      </div>
    </>}
</Container>
</Fragment>

    )

}

export {Home}










