import React from "react";
import Button from 'react-bootstrap/Button';
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    return (
    <main className="pt-5 flex-fill">
        <h1 className="d-flex justify-content-center">
            Welcome to Rock Paper Scissors Showdown!
        </h1>
        <h2 className="d-flex justify-content-center">Presented to you by Alec Yorgesen!</h2>
        <div className="d-flex justify-content-center"><h5>Username:</h5></div>
        <div className="d-flex justify-content-center m-2"><input type="text" /></div>
        <div className="d-flex justify-content-center"><h5>Password:</h5></div>
        <div className="d-flex justify-content-center m-2"><input type="password" /></div>
        <div className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-primary m-2 button">Login</Button>
            <Button type="submit" className="btn btn-primary m-2 button">Create Account</Button>
        </div>
    </main>
    )
}