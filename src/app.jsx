import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
// import { AuthState } from './login/AuthState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {

    return (
        <BrowserRouter>
            <header class="sticky-top">
                <nav class="navbar navbar-expand-lg bg-grey">
                    <div class="container-fluid">
                    <img src="Rock Paper Scissors Showdown.png" alt="RPS Showdown" width="50" />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="index.html">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="play.html">Play</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="scores.html">Scores</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About the game</a>
                        </li>
                        </ul>
                    </div>
                    <div class="d-flex ms-auto">
                        <p class="mb-0 me-3">lDrac360l (Username)</p>
                    </div>
                    </div>
                </nav>
            </header>
        </BrowserRouter>
    )
}