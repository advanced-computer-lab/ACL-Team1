import React, { useState, Fragment, useRef } from 'react'
import axios from 'axios';

// import { useNavigate } from 'react-router-dom';



const Search = ({onFlightsChange}) => {



    const departureCity = useRef("");
    const destinationCity = useRef("");
    const departureDate = useRef("");
    const arrivalDate = useRef("");
    const cabinClass = useRef("");
    const numOfPassengers = useRef("");

    const [flights, setFlights] = useState([]);


    function handleClick() {
        console.log("Button clicked")
        var body = {};

        if (departureCity.current.value !== '') {
            body['from'] = departureCity.current.value;
        }

        if (destinationCity.current.value !== '') {
            body['to'] = destinationCity.current.value;
        }

        if (departureDate.current.value !== '') {
            body['departureDate'] = departureDate.current.value;
        }

        if (arrivalDate.current.value !== '') {
            body['arrivalDate'] = arrivalDate.current.value;
        }

        if (cabinClass.current.value !== '') {

            body['eSeatsAvailable'] = cabinClass.current.value;
        }

        if (numOfPassengers.current.value !== '') {
            body['numberOfPassengers'] = numOfPassengers.current.value;

        }
        axios.post("/flights/find", body)

            .then((res) => {
                console.log(res.data);
                setFlights(res.data)
                onFlightsChange(res.data)
            })
            .catch((err) => console.log(err))

    }


    return (
        <Fragment >
            <div>
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search departure city"
                    ref={departureCity}
                />
                

                <input
                    className="search-field"
                    type="text"
                    placeholder="Search destination city"
                    ref={destinationCity}

                />
                
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search departure date"
                    ref={departureDate}

                />
                
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search arrival date"
                    ref={arrivalDate}

                />
                
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search cabin class"
                    ref={cabinClass}
                />
                
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search number of passengers"
                    ref={numOfPassengers}

                />
                <button onClick={handleClick} className="search-button">Search</button>

            </div><br />
            
           

        </Fragment>


    )
}

export { Search }