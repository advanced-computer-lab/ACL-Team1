import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap'
import "../App.css";

function ItineraryMail() {

    let navigate = useNavigate();

    const [user,setUser] = useState();
    

    const loadUserFromStorage = async () => {
        const savedUser = await JSON.parse(localStorage.getItem('user'));
        setUser(savedUser)
        
    }
    
    useEffect(() => {
      loadUserFromStorage()
    }, []);
    const backToUserProfile = (passportNumber) => {
        navigate(`/profile/${passportNumber}`)
    }
    return (
    <Container><br/>
        <div className="col-lg-4 pb-1">
            <div class="card shadow mb-5 bg-white rounded">
                <div class="card-body">
                    <h3 id="confirmed-reservation" class="card-title">Itinerary mail sent successfully!</h3><br/><br/>
                    {/* <p class="card-text">Booking Number: {booking}</p> */}
                    <button className="btn btn-primary" onClick={() => backToUserProfile(user.passportNumber)}>Back to My Profile</button>
                </div>
            </div>
        </div>
    </Container>
    )
}

export default ItineraryMail
