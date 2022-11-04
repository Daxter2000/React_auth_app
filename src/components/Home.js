import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import Registration from './auth/registration';



const  Home = (props) => {

    const navigate = useNavigate()

    const handleSuccesfullAuth =(data) => {
        props.handleLogin(data)
        navigate("/dashboard")
    }

    const handleLoggedOut = () => {
        props.handleLoggedOut()
    }
        return (
        <div>
            <div>
                <h1>Home component</h1>
                <h1>Status: {props.status}</h1>
                <button onClick={()=> handleLoggedOut()}> Cerrar sesion</button>
                <Registration handleSuccesfullAuth={handleSuccesfullAuth}/>
                <Login handleSuccesfullAuth={handleSuccesfullAuth} />
            </div>
        </div>
        );
    
}

export default Home;