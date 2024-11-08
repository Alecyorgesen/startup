import React from "react";
import Button from "react-bootstrap/Button";
import "./play.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //I might change this later...

export default function Play({
  gameInProgress,
  setGameInProgress,
  pngList,
  setPngList,
}) {
  let alt = "gray_squre";
  return (
    <main>
      {gameInProgress === false && (
        <nav className="d-flex justify-content-center">
          <Button
            type="submit"
            className="btn btn-primary m-2 button"
            onClick={() => setGameInProgress(true)}
          >
            Find random match
          </Button>
          <Button
            type="submit"
            className="btn btn-primary m-2 button"
            onClick={() => setGameInProgress(true)}
          >
            Play against a friend
          </Button>
        </nav>
      )}

      <div className="row p-5">
        <Image png={pngList[5]} alt={alt} />
        <Image png={pngList[6]} alt={alt} />
        <Image png={pngList[7]} alt={alt} />
        <Image png={pngList[8]} alt={alt} />
        <Image png={pngList[9]} alt={alt} />
      </div>

      <div className="row pt-5">
        {gameInProgress === true && (
          <>
            <Dropdown number={0} />
            <Dropdown number={1} />
            <Dropdown number={2} />
            <Dropdown number={3} />
            <Dropdown number={4} />
          </>
        )}
      </div>

      <div className="row pb-5">
        <Image png={pngList[0]} alt={alt} />
        <Image png={pngList[1]} alt={alt} />
        <Image png={pngList[2]} alt={alt} />
        <Image png={pngList[3]} alt={alt} />
        <Image png={pngList[4]} alt={alt} />
      </div>
    </main>
  );

  async function startGame() {
    setGameInProgress(true);
  }

  function Image({ png, alt }) {
    return (
      <div className="col d-flex justify-content-center">
        <img src={png} alt={alt} width="100px" />
      </div>
    );
  }

  function Dropdown({ number }) {
    return (
      <div className="dropdown col d-flex justify-content-center">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setElementInPngList(number, "rock.png")}
            >
              Rock
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setElementInPngList(number, "paper.png")}
            >
              Paper
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setElementInPngList(number, "scissors.png")}
            >
              Scissors
            </button>
          </li>
        </ul>
      </div>
    );
  }

  function setElementInPngList(i, type) {
    let newList = [...pngList];
    newList[i] = type;
    setPngList(newList);
  }
}
