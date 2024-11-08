import React from "react";
import Button from "react-bootstrap/Button";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({
    username,
    setUsername,
    authenticated,
    setAuthenticated,
}) {
    const [inputUsername, setInputUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <main className="pt-5 flex-fill">
            <h1 className="d-flex justify-content-center">
                Welcome to Rock Paper Scissors Showdown!
            </h1>
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
        setUsername(inputUsername);
        setAuthenticated(true);
    }

    async function login() {
        setUsername(inputUsername);
        setAuthenticated(true);
    }

    async function logout() {
        setUsername("");
        setAuthenticated(false);
    }
}
