// user signup component form
import React, { Component } from "react";
import API  from "../utils/API";

class UsrSignup extends Component {
    constructor(){
        super()
        this.state = {
            user_name: "",
            pword: "",
            confirm_pword: "",
            email: "",
            first_name: "",
            last_name: ""

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }

    handleSubmit(user_name, pword, email, first_name, last_name) {
        var newUser = {
            user_name: user_name,
            pword: pword,
            email: email,
            first_name: first_name,
            last_name: last_name
        };
        console.log(newUser);
        API.createUser(newUser).then(res => {
            if(!res.data.errmsg)
            {
                this.setState({ redirectTo: "/profile"});
            }
            else
            {

            }
        }).catch(error => {
            console.log(error);
        })

    }

render() {
    return(
        <div className="SignupForm">
            <h4>Create a user for Snow Routes</h4>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="form-label" htmlFor="user_name">Username:</label>
                    <input className="form-input" type="text" id="user_name" name="user_name" value={this.state.user_name} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="pword">Password:</label>
                    <input className="form-input" type="password" name="pword" value={this.state.pword} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="fname">First Name:</label>
                    <input className="form-input" type="text" id="fname" name="fname" value={this.state.first_name} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="lname">Last Name:</label>
                    <input className="form-input" type="text" id="lname" name="lname" value={this.state.last_name} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-input" type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.handleSubmit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

}

export default UsrSignup;