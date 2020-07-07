import React, { Component } from 'react'

export default class Signup extends Component {
    constructor(){
        super();
        this.state = {content: '', pass: ''}
        this._handleChange=this._handleChange.bind(this);
        this._handlePassChange=this._handlePassChange.bind(this);
    }
    
    _handleChange(event){
        this.setState({content: event.target.value})
    }

    _handlePassChange(event){
        this.setState({pass: event.target.value})
    }
    
    _handleConfPassChange(event){
        this.setState({pass: event.target.value})
    }
    render(){
        return (
            
            <form >
                <h1>Signup</h1>
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" value={this.state.content} required="required" onChange={this._handleChange}></input>
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" value={this.state.pass} required="required" onChange={this._handlePassChange}></input>
                <label for="password">Confirm Password:</label>
                <input type="password" name="password" id="conf-password" value={this.state.pass} required="required" onChange={this._handleConfPassChange}></input>
                <input type="submit" name="commit" value="Login"></input>
            </form>
        )
    }
}
