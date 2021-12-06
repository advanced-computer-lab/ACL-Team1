import React, { useState, Fragment, useRef } from 'react'
import axios from 'axios';

// import { useNavigate } from 'react-router-dom';



const Search = ({onFlightsChange}) => {



    const departureCity = useRef("");
    const destinationCity = useRef("");
    const departureDate = useRef("");
    const arrivalDate = useRef("");
    const economySeats = useRef("");
    const buisnessSeats = useRef("");
    // const numOfPassengers = useRef("");

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

        if (economySeats.current.value !== '') {

            body['eSeatsAvailable'] = economySeats.current.value;
        }

        if (buisnessSeats.current.value !== '') {

            body['bSeatsAvailable'] = buisnessSeats.current.value;
        }



        // if (numOfPassengers.current.value !== '') {
        //     body['reservedUsers'] = numOfPassengers.current.value;

        // }
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
                    placeholder="Search economy seats"
                    ref={economySeats}
                />

                <input
                    className="search-field"
                    type="text"
                    placeholder="Search buisness seats "
                    ref={buisnessSeats}

                />
                <button onClick={handleClick} className="search-button">Search</button>

            </div><br />
            
           

        </Fragment>


    )
}

export { Search }
