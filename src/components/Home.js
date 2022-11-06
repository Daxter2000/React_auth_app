import axios from 'axios';
import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NewCompany from './company/NewCompany';



const  Home = (props) => {

    useEffect(() =>{
        props.checkCompany()
    },[])

    const navigate = useNavigate()

    const handleSuccesfullAuth =(data) => {
        props.handleLogin(data)
    }

    const handleLoggedOut = () => {
        axios.delete("http://localhost:3000/logout", {withCredentials:true}).then(
        props.handleLoggedOut()
        ).catch(e => {
            console.log("errors", e)
        })
    }
        return (
        <div>
            <div>
                <h1>Home component</h1>
                <h1>Status: {props.userStatus}</h1>
                {
                    props.userStatus === "LOGGED_IN" ?
                     <div>
                        <button onClick={()=> handleLoggedOut()}> Cerrar sesion</button> 
                        {props.company == "" ? 
                            <NewCompany />
                        :
                        <div> YA TIENE UNA COMPANIA</div>
                        }
                     </div>                     
                     :
                     <button onClick={() => navigate("/login")}> Login</button>
                }
               

            </div>
        </div>
        );
    
}

export default Home;