import React, { Component, useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration= (props) => {

        const navigate = useNavigate()
        const [user, setUser] = useState({})
        const [registrationErrors, setRegistrationErrors] = useState("")

        useEffect(()  =>{

            setUser({email:"",password:"",password_confirmation:""})
        },[])

        const handleChange = (e) => {
            e.preventDefault()
            setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))

          }

        const handleSubmit = (e) => {
            
            axios.post("http://localhost:3000/auth/registrations"
            , {
                user: {
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation
                }
            },
            {withCredentials: true}
            )
            .then(response => {
                if (response.data.status ==='created'){
                    console.log("creadteddd")
                    props.handleSuccesfullAuth(response.data)
                    navigate("/home")
                }
            })
            .catch(error => {
                console.log("registration error", error.code)
            })

            e.preventDefault();

        }

          return ( 
            <div>
                <form onSubmit={handleSubmit}>

                    <input type="email" 
                        name="email"
                        placeholder="Email"
                        value={user.email || ""} 
                        onChange={handleChange} 
                        required 
                    />

                    <input type="password" 
                        name="password"
                        placeholder="Password"
                        value={user.password || ""} 
                        onChange={handleChange} 
                        required 
                    />

                    <input type="password" 
                        name="password_confirmation"
                        placeholder="Password confirmation"
                        value={user.password_confirmation || ""} 
                        onChange={handleChange} 
                        required 
                    />

                    <button type="submit">Registration</button>
                </form>
            </div>
         );

    }

export default Registration;