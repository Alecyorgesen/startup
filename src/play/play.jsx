import React from "react";
import './play.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Play() {
    return (
    <main>
        <nav className="d-flex justify-content-center">
            <button className="btn btn-primary m-2 button">Find random match</button>
            <button className="btn btn-primary m-2 button">Play against a friend</button>
        </nav>
        <div className="row">
          <div className="dropdown col d-flex justify-content-center">
            <img src="gray_square.png" alt="gray_square" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="gray_square.png" alt="gray_square" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="gray_square.png" alt="gray_square" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="gray_square.png" alt="gray_square" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="gray_square.png" alt="gray_square" width="100px" />
          </div>
        </div>
        <div className="row">
          <div className="dropdown col d-flex justify-content-center">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Select
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button">Rock</button></li>
              <li><button className="dropdown-item" type="button">Paper</button></li>
              <li><button className="dropdown-item" type="button">Scissors</button></li>
            </ul>
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Select
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button">Rock</button></li>
              <li><button className="dropdown-item" type="button">Paper</button></li>
              <li><button className="dropdown-item" type="button">Scissors</button></li>
            </ul>
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Select
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button">Rock</button></li>
              <li><button className="dropdown-item" type="button">Paper</button></li>
              <li><button className="dropdown-item" type="button">Scissors</button></li>
            </ul>
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Select
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button">Rock</button></li>
              <li><button className="dropdown-item" type="button">Paper</button></li>
              <li><button className="dropdown-item" type="button">Scissors</button></li>
            </ul>
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Select
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button">Rock</button></li>
              <li><button className="dropdown-item" type="button">Paper</button></li>
              <li><button className="dropdown-item" type="button">Scissors</button></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="dropdown col d-flex justify-content-center">
            <img src="gray_square.png" alt="gray_square" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="rock.png" alt="rock" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="scissors.png" alt="scissors" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="paper.png" alt="paper" width="100px" />
          </div>
          <div className="dropdown col d-flex justify-content-center">
            <img src="rock.png" alt="rock" width="100px" />
          </div>
        </div>
    </main>
    )
}