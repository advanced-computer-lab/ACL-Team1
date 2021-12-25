import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import "../App.css";
import CustomInput from "./CustomInput";
import Button from "./Button";

function Register() {

    let navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passportNumber, setPassportNumber] = useState("")


    async function onSubmit(event) {
        event.preventDefault();

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                passportNumber,
                email,
                password,
            })
        })

        const data = await response.json()

        if (data.message === "Success") {
            alert("Registeration successful!")
            navigate('/login')
        } else {
            alert("Email already taken.")
        }
        
    }

    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? navigate("/"): null)

        
    }, [])

    // async function onSubmit(event){
    //     event.preventDefault();

    
    //     const response = await fetch('/api/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             firstName,
    //             lastName,
    //             email,
    //             password,
    //             passportNumber

    //         }),
    //     })

    //     const data = await response.json()

    //     if (data.status === 'ok') {
               
    //         navigate('/login')
    //     }

    //     console.log(data)
    // }
    return (
        <Container>
            <div className="Application">
                <form className="form" autoComplete="off" onSubmit={onSubmit}>
                    <CustomInput
                        labelText="First Name"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        required
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={e => setFirstName(e.target.value)}
                        type="text"
                    />
                    <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        required
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={e => setLastName(e.target.value)}
                        type="text"
                    />
                    <CustomInput
                        labelText="Passport Number"
                        id="passportNumber"
                        name="passportNumber"
                        value={passportNumber}
                        required
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={e => setPassportNumber(e.target.value)}
                        type="text"
                    />
                    <CustomInput
                        labelText="Email"
                        id="email"
                        name="email"
                        value={email}
                        required
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={e => setEmail(e.target.value)}
                        type="text"
                    />
                    <CustomInput
                        labelText="Password"
                        id="password"
                        name="password"
                        value={password}
                        required
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Button type="submit" color="primary" className="form__custom-button">
                        Sign up
                    </Button>

                </form>
            </div>
        </Container>
    )
}

export default Register
