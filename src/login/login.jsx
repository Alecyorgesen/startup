import React from "react";
import Button from "react-bootstrap/Button";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { response } from "express";

export default function Login({
    username,
    setUsername,
    authenticated,
    setAuthenticated,
    token,
    setToken
}) {
    const [inputUsername, setInputUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorText, setErrorText] = React.useState("");

    return (
        <main className="pt-5 flex-fill">
            <h1 className="d-flex justify-content-center">
                Welcome to Rock Paper Scissors Showdown!
            </h1>
            <p className="d-flex justify-content-center text-danger">{errorText}</p>
            {authenticated === false && (
                <>
                    <h2 className="d-flex justify-content-center">Please log in:</h2>
                    <div className="d-flex justify-content-center">
                        <h5>Username:</h5>
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <input
                            type="text"
                            onChange={(event) => setInputUsername(event.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h5>Password:</h5>
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <input
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button
                            type="submit"
                            className="btn btn-primary m-2 button"
                            onClick={() => login()}
                        >
                            Login
                        </Button>
                        <Button
                            type="submit"
                            className="btn btn-primary m-2 button"
                            onClick={() => createUser()}
                        >
                            Create Account
                        </Button>
                    </div>
                </>
            )}
            {authenticated === true && (
                <>
                    <h2 className="d-flex justify-content-center pt-5">
                        Welcome {username}!
                    </h2>
                    <div className="d-flex justify-content-center">
                        <Button
                            type="submit"
                            className="btn btn-primary m-2 button"
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
                    </div>
                </>
            )}
        </main>
    );
    async function createUser() {
        if (inputUsername === '') {
            setErrorText("Username is empty.")
            return
        }
        if (password === '') {
            setErrorText("Password is empty.")
            return
        }
        await fetch('api/auth/create', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name: inputUsername, password: password }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.token) {
                    setToken(response.token)
                    setUsername(inputUsername);
                    setAuthenticated(true);
                    setErrorText('');
                } else if (response.msg) {
                    setErrorText(response.msg);
                }
            })
    }

    async function login() {
        if (inputUsername === '') {
            setErrorText("Username is empty.")
            return
        }
        if (password === '') {
            setErrorText("Password is empty.")
            return
        }
        await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name: inputUsername, password: password }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.token) {
                    setToken(response.token);
                    setUsername(inputUsername);
                    setAuthenticated(true);
                    setErrorText('');
                } else if (response.msg) {
                    setErrorText(response.msg)
                }
            })
        setUsername(inputUsername);
        setAuthenticated(true);
    }

    async function logout() {
        setUsername("");
        setAuthenticated(false);
    }
}
