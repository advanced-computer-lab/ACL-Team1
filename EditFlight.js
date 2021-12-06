import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';



const EditFlight = (props) => {
    const [flightNumber, setFlightNumber] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [departureTerminal, setDepartureTerminal] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [arrivalTerminal, setArrivalTerminal] = useState("");
    const [eSeatsAvailable, setEconomySeatsAvailable] = useState("");
    const [bSeatsAvailable, setBuisnessSeatsAvailable] = useState("");



    const changeOnClick = e => {
        e.preventDefault();

        const flights = {
            flightNumber,
            departureDate,
            departureTime,
            departureTerminal,
            arrivalDate,
            arrivalTime,
            arrivalTerminal,
            eSeatsAvailable,
            bSeatsAvailable
        };

        setFlightNumber("")
        setDepartureDate("")
        setDepartureTime("")
        setDepartureTerminal("")
        setArrivalDate("")
        setArrivalTime("")
        setArrivalTerminal("")
        setEconomySeatsAvailable("")
        setBuisnessSeatsAvailable("");



        axios
            .post(`/users/updateFlight/${props.match.params.id}`, flights)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .get(`/flights/${props.match.params.id}`)
            .then(res => [
                setFlightNumber(res.data.flightNumber),
                setDepartureDate(res.data.setDepartureDate),
                setDepartureTime(res.data.departureDate),
                setDepartureTerminal(res.data.departureTerminal),
                setArrivalDate(res.data.arrivalDate),
                setArrivalTime(res.data.arrivalTime),
                setArrivalTerminal(res.data.arrivalTerminal),
                setEconomySeatsAvailable(res.data.eSeatsAvailable),
                setBuisnessSeatsAvailable(res.data.bSeatsAvailable)
            ])
            .catch(error => console.log(error));
    }, [props]);



    return (
            <Container>
                <div ><br />
                    <h3>Edit Flight </h3>
                    <form onSubmit={changeOnClick}>
                        <div className="form-group">
                            <label htmlFor="flightNumber">Flight Number: </label>
                            <input
                                type="text"
                                name="flightNumber"
                                value={flightNumber}
                                required
                                className="form-control"
                                placeholder="Edit flight number"
                                onChange={e => setFlightNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="departureDate">Departure Date: </label>
                            <input
                                type="text"
                                name="departureDate"
                                value={departureDate}
                                required
                                className="form-control"
                                placeholder="Edit departure date"
                                onChange={e => setDepartureDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="departureTime">Departure Time: </label>
                            <input
                                type="text"
                                name="departureTime"
                                value={departureTime}
                                required
                                className="form-control"
                                placeholder="Edit departure time"
                                onChange={e => setDepartureTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="departureTerminal">Departure Terminal: </label>
                            <input
                                type="text"
                                name="departureTerminal"
                                value={departureTerminal}
                                required
                                className="form-control"
                                placeholder="Edit departure terminal"
                                onChange={e => setDepartureTerminal(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="arrivalDate">Arrival Date: </label>
                            <input
                                type="text"
                                name="arrivalDate"
                                value={arrivalDate}
                                required
                                className="form-control"
                                placeholder="Edit arrival date"
                                onChange={e => setArrivalDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="arrivalTime">Arrival Time: </label>
                            <input
                                type="text"
                                name="arrivalTime"
                                value={arrivalTime}
                                required
                                className="form-control"
                                placeholder="Edit arrival time"
                                onChange={e => setArrivalTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="arrivalTerminal">Arrival Terminal: </label>
                            <input
                                type="text"
                                name="arrivalTerminal"
                                value={arrivalTerminal}
                                required
                                className="form-control"
                                placeholder="Edit arrival terminal"
                                onChange={e => setArrivalTerminal(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="eSeatsAvailable">Economy Seats Available: </label>
                            <input
                                type="text"
                                name="eSeatsAvailable"
                                value={eSeatsAvailable}
                                required
                                className="form-control"
                                placeholder="Edit number of economy seats available"
                                onChange={e => setEconomySeatsAvailable(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bSeatsAvailable">Buisness Seats Available: </label>
                            <input
                                type="text"
                                name="bSeatsAvailable"
                                value={bSeatsAvailable}
                                required
                                className="form-control"
                                placeholder="Edit number of buisness seats available"
                                onChange={e => setBuisnessSeatsAvailable(e.target.value)}
                            />
                        </div>
                        <div className="form-group"><br/>
                            <button type="submit" className="btn btn-primary">
                                Add Flight
                            </button>
                        </div><br />
                    </form>
                </div>
            </Container>
        
    )

   
}

export { EditFlight }


