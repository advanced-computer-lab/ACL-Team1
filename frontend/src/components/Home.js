import React, { useState, useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import "../App.css";
import axios from 'axios'
import { Search } from './Search'
// import { UserAuthintication } from "./UserAuthintication";
import { useNavigate } from "react-router-dom";
import spinner from '../spinner.gif'




function Home() {

    let navigate = useNavigate();

    // function handleClick(flight) {
    //     navigate("/flights/");
    // }


    const [flights, setFlights] = useState([]);
    useEffect(() => {
        axios.get('/flights/')
            .then(res => setFlights(res.data))
            .catch(error => console.log(error));
    }, []);


    // const [currentFlight, setCurrentFlight] = useState({})
    // const [toggle, setToggle] = useState(false)



    // function viewMoreHandler(flight) {
    //     console.log(flight.flightNumber)
    //     setCurrentFlight(flight)
    //     setToggle(!toggle)

    // }

    function handleViewInfo(id) {
        navigate(`/flights/${id}`);
    }

    // function handleReserveButton() {
    //     navigate("/userAuthintication")
    // }

    const onFlightsChange = (data) => { setFlights(data) }

    return (
        <Fragment>
            <Container>
                <Search onFlightsChange={onFlightsChange} />

                <h3 className="header">All Flights:</h3><br />
                {!flights.length > 0 ? <img src={spinner} alt="Loading.." /> :
                <div className="row" >
                    {flights.map((flight, key) => (
                        <div className="col-lg-4 pb-1" key={flight.flightNumber}>
                            <div className="card" key={flight.flightNumber}>
                                <div className="card-body">
                                    <h5 className="card-title">Flight Number: {flight.flightNumber}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">From : {flight.from}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">To : {flight.to}</h6><br />
                                    <h6 className="card-subtitle mb-2 ">Departure Date & Time : {flight.departureDate} / {flight.departureTime}</h6>
                                    <h6 className="card-subtitle mb-2 ">Arrival Date & Time: {flight.arrivalDate} / {flight.arrivalTime}</h6>
                                    {/* <button className="btn btn-info col-lg-5 mx-1 mb-1" onClick={() => {
                                        viewMoreHandler(flight)
                                    }}>View More Info</button> */}
                                    <button className="btn btn-info col-lg-5 mx-1 mb-1" onClick={() => handleViewInfo(flight._id)}>View More Info</button>
                                    {/* <Link to={`/flights/${flight._id}`} >View More Info</Link> */}
                                </div>
                            </div>
                        </div>

                    ))}

                </div> }


                {/* <div> */}
                {/* <div>
                        {toggle ? <h1>{currentFlight ? <div className="row" ><div className="col-lg-4 pb-1" key={currentFlight.flightNumber} ><div class="card bg-info mb-3" style={{ "max-width": "18rem" }}>
                            <div class="card-header text-white"><h4>Flight {currentFlight.flightNumber} Details</h4></div>
                            <div class="card-body">
                                <h6 className="card-subtitle mb-2 text-black">Departure Airport : {currentFlight.departureAirport} </h6>
                                <h6 className="card-subtitle mb-2 text-black">Arrival Airport: {currentFlight.arrivalAirport} </h6>
                                <h6 className="card-subtitle mb-2 text-black">Baggage Allowance: {currentFlight.baggageAllowance} </h6>
                                <h6 className="card-subtitle mb-2 text-black">Trip Duration: {currentFlight.tripDuration} </h6><br />
                                <h6 className="card-subtitle mb-2 text-black">Cabin class: <input className="cabin-class"
                                    type="text"
                                    placeholder="Enter cabin class"></input> </h6>

                                <h6 className="card-subtitle mb-2 text-black">Number of seats: <input className="number-of-seats"
                                    type="text"
                                    placeholder="Enter number of seats"></input> </h6>
                                <button id="reserve_flight" className="btn btn-light col-lg-5 mx-1 mb-1" onClick={handleReserveButton} >Reserve</button>
                                {/* <Link to="/userAuthintication"><a>Reserve</a></Link> */}
                {/* <button id="back" className="btn btn-light col-lg-5 mx-1 mb-1" onClick={() => {
                                    viewMoreHandler(currentFlight)
                                }}>Back</button> */}

                {/* </div>
                        </div></div></div> : <h1>Loading</h1>}</h1> : <div></div>}
                    </div> */}

                {/* </div> */}
            </Container>
        </Fragment>

        // <Flight  currentFlight={currentFlight}/>


    )

}

export { Home }






// const [flightNumber, setFlightNumber] = useState("");
    // const [departureDate, setDepartureDate] = useState("");
    // const [departureTime, setDepartureTime] = useState("");
    // const [departureTerminal, setDepartureTerminal] = useState("");
    // const [arrivalDate, setArrivalDate] = useState("");
    // const [arrivalTime, setArrivalTime] = useState("");
    // const [arrivalTerminal, setArrivalTerminal] = useState("");
    // const [eSeatsAvailable, setEconomySeatsAvailable] = useState("");
    // const [bSeatsAvailable, setBuisnessSeatsAvailable] = useState("");



    // const onSubmit = e => {
    //     e.preventDefault();

    //     const flights = {
    //         flightNumber,
    //         departureDate,
    //         departureTime,
    //         departureTerminal,
    //         arrivalDate,
    //         arrivalTime,
    //         arrivalTerminal,
    //         eSeatsAvailable,
    //         bSeatsAvailable
    //     };



    //     setFlightNumber("")
    //     setDepartureDate("")
    //     setDepartureTime("")
    //     setDepartureTerminal("")
    //     setArrivalDate("")
    //     setArrivalTime("")
    //     setArrivalTerminal("")
    //     setEconomySeatsAvailable("")
    //     setBuisnessSeatsAvailable("");



    //     axios
    //         .post("/users/addFlight", flights)
    //         .then(res => console.log(res.data))
    //         .catch(err => {
    //             console.log(err);
    //         });


    // };




        // <Fragment>
        //     <Container>
        //         <div><br />                    
        //             <h3 className="header">All Flights</h3><br />



        //             {/* <form autoComplete="off">
        //                 <table className="table">
        //                     <thead className="thead-light">
        //                         <tr>
        //                             <th>Flight Number</th>
        //                             <th>Departure Date</th>
        //                             <th>Departure Time</th>
        //                             <th>Departure Terminal</th>
        //                             <th>Arrival Date</th>
        //                             <th>Arrival Time</th>
        //                             <th>Arrival Terminal</th>
        //                             <th>Economy Seats Available</th>
        //                             <th>Buisness Seats Available</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody >
        //                         <Flights flights={flights} />
        //                     </tbody>
        //                 </table>
        //             </form> */}
        //         </div>


        //     </Container>
        //     <Container>

        //         <div >
        //             <h3>Create New Flight </h3>
        //             <form onSubmit={onSubmit}>
        //                 <div className="form-group">
        //                     <label htmlFor="flightNumber">Flight Number: </label>
        //                     <input
        //                         type="text"
        //                         name="flightNumber"
        //                         value={flightNumber}
        //                         required
        //                         className="form-control"
        //                         placeholder="Enter flight number"
        //                         onChange={e => setFlightNumber(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="departureDate">Departure Date: </label>
        //                     <input
        //                         type="text"
        //                         name="departureDate"
        //                         value={departureDate}
        //                         required
        //                         className="form-control"
        //                         placeholder="Enter departure date"
        //                         onChange={e => setDepartureDate(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="departureTime">Departure Time: </label>
        //                     <input
        //                         type="text"
        //                         name="departureTime"
        //                         value={departureTime}
        //                         required
        //                         className="form-control"
        //                         placeholder="Enter departure time"
        //                         onChange={e => setDepartureTime(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="departureTerminal">Departure Terminal: </label>
        //                     <input
        //                         type="text"
        //                         name="departureTerminal"
        //                         value={departureTerminal}
        //                         required
        //                         className="form-control"
        //                         placeholder="Choose departure terminal"
        //                         onChange={e => setDepartureTerminal(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="arrivalDate">Arrival Date: </label>
        //                     <input
        //                         type="text"
        //                         name="arrivalDate"
        //                         value={arrivalDate}
        //                         required
        //                         className="form-control"
        //                         placeholder="Enter arrival date"
        //                         onChange={e => setArrivalDate(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="arrivalTime">Arrival Time: </label>
        //                     <input
        //                         type="text"
        //                         name="arrivalTime"
        //                         value={arrivalTime}
        //                         required
        //                         className="form-control"
        //                         placeholder="Enter arrival time"
        //                         onChange={e => setArrivalTime(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="arrivalTerminal">Arrival Terminal: </label>
        //                     <input
        //                         type="text"
        //                         name="arrivalTerminal"
        //                         value={arrivalTerminal}
        //                         required
        //                         className="form-control"
        //                         placeholder="Choose arrival terminal"
        //                         onChange={e => setArrivalTerminal(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="eSeatsAvailable">Economy Seats Available: </label>
        //                     <input
        //                         type="text"
        //                         name="eSeatsAvailable"
        //                         value={eSeatsAvailable}
        //                         required
        //                         className="form-control"
        //                         placeholder="Choose number of economy seats available"
        //                         onChange={e => setEconomySeatsAvailable(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="bSeatsAvailable">Buisness Seats Available: </label>
        //                     <input
        //                         type="text"
        //                         name="bSeatsAvailable"
        //                         value={bSeatsAvailable}
        //                         required
        //                         className="form-control"
        //                         placeholder="Choose number of buisness seats available"
        //                         onChange={e => setBuisnessSeatsAvailable(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group"><br />
        //                     <button type="submit" className="btn btn-success">
        //                         Add Flight
        //                     </button>
        //                 </div><br />
        //             </form>
        //         </div>
        //     </Container>

        // // </Fragment>









