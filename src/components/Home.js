import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from './auth/registration';

const  Home = (props) => {

    const navigate = useNavigate()

    const handleSuccesfullAuth =(data) => {
        props.handleLogin(data)
        navigate("/dashboard")
    }
        return (
        <div>
            <div>
                <h1>Home component</h1>
                <h1>Status: {props.status}</h1>
                <Registration handleSuccesfullAuth={handleSuccesfullAuth}/>
            </div>
        </div>
        );
    
}

export default Home;