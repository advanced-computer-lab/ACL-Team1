import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import CustomInput from "./CustomInput";
import Button from "./Button";

function Login() {


    // let navigate = useNavigate();

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");


    // const onSubmit = e => {
    //     e.preventDefault();

    //     const user = {
    //         email,
    //         password,
    //     };

    //     setEmail("")
    //     setPassword("");



    //     axios
    //         .post("/users/login", user)
    //         .then(res => {
    //             localStorage.setItem('user', JSON.stringify(res.data))
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });

    //     navigate('/')
    // };
     let navigate = useNavigate();

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");


     async function loginUser(event) {
         event.preventDefault();

         const form = event.target;
         const user = {
             email: form[0].value,
             password: form[1].value
         }

         const response = await fetch('/login', {
            method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
            },
             body: JSON.stringify(user),
         
         }) 

         const data = await response.json();
                  
         if(data.token) {
            localStorage.setItem("token", data.token)
         axios
            .post("/users/login", user)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
            })
            .catch(err => {
                console.log(err);
            });

            navigate('/')
            alert("Login successful!")
         } else {
             alert("Invalid email or password.")
         }

      

         
        //  if(data.user) {
        //      localStorage.setItem('user', data.user)
        //      console.log(data)
        //      alert('Login successful')
        //      navigate('/')
        //  } else {
        //      alert('Email or password not correct!')
        //  }
        //  console.log(data)



         




      
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

     

    return (
        <Container>
            <div className="Application">
                <form className="form" autoComplete="off" onSubmit={loginUser}>

                    {/* <h4>E-mail: </h4>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        required
                        placeholder="E-mail"
                        onChange={e => setEmail(e.target.value)}

                    /><br /><br /> */}

                    {/* <h4>Password:</h4>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        required
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}

                    /><br /><br /> */}
                    {/* <button type="submit" className="btn btn-success">
                        Login
                    </button> */}
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
                        Log in
                    </Button>

                </form>
            </div>
        </Container>
    )

}

export default Login 

// import React, { Component } from "react";
// import "./styles.css";
// import CustomInput from "./components/CustomInput";
// import Button from "./components/Button";

// export default class App extends Component {
//   state = {
//     email: "",
//     password: ""
//   };

//   handleChange = e => {
//     this.setState({ [e.currentTarget.id]: e.currentTarget.value });
//   };

//   render() {
//     return (
//       <div className="App">
//         <form className="form">
//           <CustomInput
//             labelText="Email"
//             id="email"
//             formControlProps={{
//               fullWidth: true
//             }}
//             handleChange={this.handleChange}
//             type="text"
//           />
//           <CustomInput
//             labelText="Password"
//             id="password"
//             formControlProps={{
//               fullWidth: true
//             }}
//             handleChange={this.handleChange}
//             type="password"
//           />

//           <Button type="button" color="primary" className="form__custom-button">
//             Log in
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }
