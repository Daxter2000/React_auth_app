import React, { Component } from 'react';
import Registration from './auth/registration';


class Home extends Component {
    render() { 
        return (
        <div>
            <div>
                <h1>Home component</h1>
                <Registration />
            </div>
        </div>
        );
    }
}
 
export default Home;