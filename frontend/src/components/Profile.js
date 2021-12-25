import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'


function Profile() {

    let navigate = useNavigate()

    const [user, setUser] = useState([])
    const [toggleEditProfile, setToggleEditProfile] = useState(false)
    const { passportNumber } = useParams()

    // const [editUserPassportNumber, setUserPassportNumber] = useState(null);

    const [editFormData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passportNumber: "",
        // password: "",
    });

    function editForm(event) {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setFormData(newFormData);
    }

    function handleEditFormSubmit(event, passportNumber) {
        event.preventDefault();

        console.log(passportNumber);
        
        const editedInfo = {
            passportNumber: editUserPassportNumber,
            firstName: editFormData.firstName,
            lastName: editFormData.lastName,
            email: editFormData.email,
            passportNumber: editFormData.passportNumber,
            // password: editFormData.password,
            
        }

        axios.put(`/users/updateUser/${passportNumber}`, editedInfo)
            .then(() => fetchUser())
            .catch(err => console.log(err))
            console.log(editedInfo)
            setToggleEditProfile(!toggleEditProfile)
            localStorage.setItem("user",editedInfo)

    }

    const [editUserPassportNumber, setUserPassportNumber] = useState(null);


    const loadUserFromStorage = async () => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        setUser(savedUser)
        
    }

    useEffect(() => {
        loadUserFromStorage()
    }, [user.passportNumber]);

   

    const fetchUser = () => {
        axios.get(`/users/findUser/${passportNumber}`)
            .then(res => setUser(res.data))
            .catch(error => console.log(error));
    }



        useEffect(() => {
        axios.get(`/users/findUser/${passportNumber}`).then(response => setUser(response.data))
    }, [passportNumber]);


    function editUser(event, userr) {
        setToggleEditProfile(!toggleEditProfile)
        event.preventDefault();
        setUserPassportNumber(userr.passportNumber);

        const formValues = {
            firstName: userr.firstName,
            lastName: userr.lastName,
            email: userr.email,
            passportNumber: userr.passportNumber,
            // password: userr.password,
        }

        setFormData(formValues);
        
    }


    function sendItineraryMail(passportNumber) {
        axios.post(`/reservations/sendItenary/${passportNumber}`)
            .then(() => navigate(`/itineraryMail`))
            .catch(err => console.log(err))
    }



    function showEditProfile() {
        setToggleEditProfile(!toggleEditProfile)
    }




    
    return (
        <Container>

            {toggleEditProfile &&  editUserPassportNumber === user.passportNumber 
            ? <div class="container rounded bg-white mt-5">
            <div class="row">
                <div class="col-md-4 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="90"/>
                    <span class="font-weight-bold">{user.firstName}&nbsp;{user.lastName}</span>
                    <span class="text-black-50">{user.email}</span>
                    <span>Egypt</span><br/>
                    <div>
                         &nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-warning" onClick={showEditProfile}>Edit Profile</button>&nbsp;
                         &nbsp;<button className="btn btn-primary" onClick={() => sendItineraryMail(user.passportNumber)}>Send itinerary mail</button></div>
                    </div>
                    
                </div>
                <div class="col-md-8">
                <form onSubmit={(event) => handleEditFormSubmit(event, editUserPassportNumber)}>
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
        
                            <div class="d-flex flex-row align-items-center back">
                                <h5>Edit Profile:</h5>
                            </div>
                           
                        </div><br/>
                        <div class="row mt-2">
                            
                            <div class="col-md-6"><h6>First Name: </h6><input id="first-name" type="text" required class="form-control" placeholder="First Name" name="firstName" value={editFormData.firstName} onChange={editForm}/></div>
        
                            <div class="col-md-6"><h6>Last Name: </h6><input id="last-name" type="text" required class="form-control"   placeholder="Last Name" name="lastName" value={editFormData.lastName} onChange={editForm}/></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><h6>E-mail: </h6><input id="email" type="text" required class="form-control" placeholder="Email" name="email" value={editFormData.email} onChange={editForm} /></div>
                            <div class="col-md-6"><h6>Passport Number: </h6><input id="passport-number" type="text" required class="form-control"  placeholder="Passport Number" name="passportNumber" value={editFormData.passportNumber} onChange={editForm}/></div>
                        </div>
                        <div class="row mt-3">
                            {/* <div class="col-md-6"><h6>Password: </h6><input id="password" type="password" class="form-control" placeholder="Password" name="password" value={editFormData.password} onChange={editForm}/></div> */}

                        </div>
        
                        <div class="mt-5 text-right">
                            <button class="btn btn-success profile-button" type="submit">Save Profile</button></div>
                    </div><br/><br/>
                    </form>
                </div>
            </div>
        </div> 
        : <div class="card-body">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="90"/>
        <span class="font-weight-bold">{user.firstName}&nbsp;{user.lastName}</span>
        <span class="text-black-50">{user.email}</span>
        <span>Egypt</span><br/>
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-warning" onClick={(event) => editUser(event, user)}>Edit Profile</button>&nbsp;
            &nbsp;<button className="btn btn-primary" onClick={() => sendItineraryMail(user.passportNumber)}>Send itinerary mail</button></div>
        </div>
        
        
    </div>}

            
        </Container>
    )
}

export default Profile
