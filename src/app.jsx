import React from 'react';
import { BrowserRouter, NavLink, Route, Router, Routes } from 'react-router-dom';
import Login from './login/login';
import Play from './play/play';
import Scores from './scores/scores';
import About from './about/about';
// import { AuthState } from './login/AuthState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //I might change this later...
import './app.css';

export default function App() {

    return (
        <BrowserRouter>
        <div className='body'>
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
                            <NavLink className="nav-link active" aria-current="page" to="">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="play">Play</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="scores">Scores</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="about">About the game</NavLink>
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
                <Route path='/' element={<Login />} />
                <Route path='/play' element={<Play />} />
                <Route path='/scores' element={<Scores />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>


            <footer className="d-flex background-grey position-absolute bottom-0 end-0">
            <div className="container-fluid">
              <div className="row">
                  <div className="col d-flex justify-content-center">
                      <p>Alec Yorgesen</p>
                  </div>
                  <div className="col d-flex justify-content-center fw-bold">
                      <a href="https://github.com/Alecyorgesen/startup">Github Link</a>
                  </div>
              </div>
            </div>
        </footer>
        </div>
        </BrowserRouter>
        
    )
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }