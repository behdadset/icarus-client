import React, { useState, useEffect, Component } from 'react'
import Registration from './Registration';
 
class Home extends Component {
    render() {
        return (
            <div>
                
                <h1>Icarus Airlines</h1>
                <Registration />
                <LoginForm />
            </div>
        )
    }
}


class LoginForm extends Component {
    constructor(){
        super();
        this.state = {content: '', pass: ''}
        this.profiles = {id: 1, email: "test@test.co", password: "chicken"}
        this._handleChange=this._handleChange.bind(this);
        this._handlePassChange=this._handlePassChange.bind(this);
    }
    
    _handleChange(event){
        this.setState({content: event.target.value})
    }

    _handlePassChange(event){
        this.setState({pass: event.target.value})
    }

    render(){
        return (
            <form >
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" value={this.state.content} required="required" onChange={this._handleChange}></input>
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" value={this.state.pass} required="required" onChange={this._handlePassChange}></input>
                <input type="submit" name="commit" value="Login"></input>
            </form>
        )
    }
    
}



export default Home