import React from "react";
import './about.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function About() {
    return (
    <main>
        <div class="d-flex justify-content-center m-5">
            <img src="https://www.rd.com/wp-content/uploads/sites/2/2016/04/rock-paper-scissor-ft.jpg" width="500" alt="A picture with a rock, paper and scissors" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
              <div className="col-8 col-md-6 text-center">
                  <h5>
                      Rock Paper Scissors Showdown is a game designed by Alec Yorgesen.
                      It involves playing 5 times as much rock paper scissors in each round than you ever would normally!
                  </h5>
              </div>
          </div>
      </div>
    </main>
    );
}