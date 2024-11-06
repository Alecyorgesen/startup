import React from 'react';
import { BrowserRouter, NavLink, Route, Router, Routes } from 'react-router-dom';
import Login from './login/login';
import Play from './play/play';
import Scores from './scores/scores';
import About from './about/about';
// import { AuthState } from './login/AuthState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {

    return (
        <BrowserRouter>
            <header className="sticky-top">
                <nav className="navbar navbar-expand-lg bg-grey">
                    <div className="container-fluid">
                    <img src="Rock Paper Scissors Showdown.png" alt="RPS Showdown" width="50" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="index.html">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="play.html">Play</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="scores.html">Scores</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="about.html">About the game</a>
                        </li>
                        </ul>
                    </div>
                    <div className="d-flex ms-auto">
                        <p className="mb-0 me-3">lDrac360l (Username)</p>
                    </div>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}