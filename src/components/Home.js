import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <Title />
                <Login />
            </div>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                
                <a href="">Sign up</a>
            </div>
        )
    }
}

class Title extends Component {
    render() {
        return (
            <div>
                <h1>Icarus Airlines</h1>
            </div>
        )
    }
}

function Login() {
    return (
        <form >
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" value="" required="required"></input>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" value="" required="required"></input>
            <input type="submit" name="commit" value="Login"></input>
        </form>
    )
}



export default Home