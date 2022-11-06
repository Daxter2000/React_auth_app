import React, { Component, useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login= (props) => {

        const navigate = useNavigate()
        const [user, setUser] = useState({})
        const [registrationErrors, setRegistrationErrors] = useState("")

        useEffect(()  =>{

            setUser({email:"",password:""})
        },[])

        const handleChange = (e) => {
            e.preventDefault()
            setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))

          }

        const handleSubmit = (e) => {
            
            axios.post("http://localhost:3000/auth/sessions"
            , {
                user: {
                    email: user.email,
                    password: user.password
                }
            },
            {withCredentials: true}
            )
            .then(response => {
                if (response.data.logged_in){
                    console.log("Iniciada sesion")
                    props.handleSuccesfullAuth(response.data)
                    navigate(-1)
                            }
            })
            .catch(error => {
                console.log("Login error", error)
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


                    <button type="submit">Registration</button>
                </form>
            </div>
         );

    }

export default Login;