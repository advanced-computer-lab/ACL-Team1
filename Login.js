import React, {useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSubmit = e => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        setEmail("")
        setPassword("");



        axios
            .post("/users/login", user)
            .then(res => {
            localStorage.setItem('user',JSON.stringify(res.data))})
            .catch(err => {
                console.log(err);
            });

        navigate(-1)    
    };

    return (
        <Container>
            <form autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group" >
                    <label htmlFor="email">E-mail: </label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        required
                        className="form-control"
                        placeholder="Enter your e-mail"
                        onChange={e => setEmail(e.target.value)}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        name="password"
                        value={password}
                        required
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}

                    />
                </div>
                <div className="form-group"><br />
                    <button type="submit" className="btn btn-success">
                        Login
                    </button>
                </div><br />
            </form>
        </Container>
    )

}

export { Login }