import React from "react";
import Button from "react-bootstrap/Button";
import "./play.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //I might change this later...
import { gameWebSocket } from "./gameWebSocket";

export default function Play({
  gameStatus,
  setGameStatus,
  pngList,
  setPngList,
  username,
  token
}) {
  let alt = "gray_squre";
  const [submitVisible, setSubmitVisible] = React.useState(false);
  const [opponentName, setOpponentName] = React.useState('');
  const [responseText, setResponseTest] = React.useState('Search Player');
  const [inputText, setInputText] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [challengerName, setChallengerName] = React.useState('')

  // React.useEffect(() => {
  //   gameWebSocket.sendMessage({ type: 'addUsername', value: { playerName: username } })
  // }, [])

  React.useEffect(() => {
    for (let i = 0; i < 5; i++) {
      if (pngList[i] == 'gray_square.png') {
        if (submitVisible === true) {
          setSubmitVisible(false);
        }
        return;
      }
    }
    if (submitVisible === false) {
      setSubmitVisible(true);
    }
  }, [pngList])

  return (
    <main>
      {gameStatus === 'noGame' && (
        <div className="container">
          <div className="row">
            <nav className="col">
              <p className="d-flex justify-content-center">{responseText}</p>
              <input className="form-control shadow mt-2 d-flex justify-content-center"
                onChange={(event) => setInputText(event.target.value)}>
              </input>
            </nav>
            <div className="col-md-auto">
              <Button
                type="submit"
                className="btn btn-primary m-2 button justify-content-center"
                onClick={startGameAgainstRandomPlayer}
              >
                Find random match
              </Button>
              <Button
                type="submit"
                className="btn btn-primary m-2 button justify-content-center"
                onClick={startGameAgainstPlayer}
              >
                Play against a friend
              </Button>
              <Button
                type="submit"
                className="btn btn-primary m-2 button justify-content-center"
                onClick={startGameAgainstBot}
              >
                Play against the bot (:&lt;
              </Button>
            </div>
            <div className="col">
              {challengerName !== '' && (
                <Button
                  type="submit"
                  className="btn btn-primary m-2 button justify-content-center"
                  onClick={acceptChallenge}
                >
                  Play against {challengerName}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {gameStatus !== 'noGame' && (
        <div
          className="d-flex justify-content-center align-items-center"
        >
          <div className="border p-3 rounded shadow" style={{ backgroundColor: "#f8f9fa" }}>
            <h4 className="text-center">{opponentName}</h4>
          </div>
        </div>
      )}

      <div className="row p-5">
        <Image png={pngList[5]} alt={alt} />
        <Image png={pngList[6]} alt={alt} />
        <Image png={pngList[7]} alt={alt} />
        <Image png={pngList[8]} alt={alt} />
        <Image png={pngList[9]} alt={alt} />
      </div>

      <div className="row pt-5">
        {gameStatus === 'gameAgainstBot' && (
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
      {(gameStatus === 'gameAgainstBot' || gameStatus === 'gameAgainstPlayer') && submitVisible === true && (
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="btn btn-primary m-2 button"
            onClick={submit}
          >
            Submit
          </Button>
        </div>
      )}

    </main>
  );

  async function submit() {
    let rps = ["rock.png", "paper.png", "scissors.png"];
    let pngListCopy = pngList.slice();
    for (let i = 5; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * rps.length);
      pngListCopy[i] = rps[randomNumber];
    }
    await setPngList(pngListCopy);
    let score = 0;
    for (let i = 0; i < 5; i++) {
      score += compare(pngList[i], pngListCopy[i + 5]);
    }
    if (score !== 0) {
      fetch('/api/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ score: score, token: token })
      })
    }
    setGameStatus('noGame');
  }

  function startGameAgainstBot() {
    setGraySquares();
    setGameStatus('gameAgainstBot');
    setOpponentName('The Bot (:<');
  }

  function startGameAgainstRandomPlayer() {
    gameWebSocket.sendMessage({ type: "randomChallenge", value: {} });
    setGraySquares();
    setMessage(`Waiting for ${inputText} to respond...`);
    setGameStatus('gameAgainstPlayer');
    setOpponentName('random name');
  }

  function startGameAgainstPlayer() {
    setGraySquares();
    gameWebSocket.sendMessage({ type: "challenge", value: { challenged: inputText, challenger: username } });
    setMessage(`Waiting for ${inputText} to respond...`);
  }
  function acceptChallenge() {
    gameWebSocket.sendMessage({ type: "acceptChallenge", value: { challenger: challengerName, challenged: username } });
    setChallengerName('');
    setOpponentName('');
    setGameStatus('gameAgainstPlayer');
  }

  function setGraySquares() {
    let list = [];
    for (let i in pngList) {
      list.push("gray_square.png");
    }
    setPngList(list);
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

function compare(pic1, pic2) {
  if (pic1 == "rock.png" && pic2 == "paper.png") {
    return -1;
  } else if (pic1 == "rock.png" && pic2 == "scissors.png") {
    return 1;
  } else if (pic1 == "rock.png" && pic2 == "rock.png") {
    return 0;
  } else if (pic1 == "paper.png" && pic2 == "paper.png") {
    return 0;
  } else if (pic1 == "paper.png" && pic2 == "scissors.png") {
    return -1;
  } else if (pic1 == "paper.png" && pic2 == "rock.png") {
    return 1;
  } else if (pic1 == "scissors.png" && pic2 == "paper.png") {
    return 1;
  } else if (pic1 == "scissors.png" && pic2 == "scissors.png") {
    return 0;
  } else if (pic1 == "scissors.png" && pic2 == "rock.png") {
    return -1;
  } else {
    return 0;
  }
}