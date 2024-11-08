import React from "react";
import './play.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";


export default function Play() {
  let list = []
  for (let i = 0; i < 10; i++) {
    list.push("gray_square.png")
  }
  const [pngList, setPngList] = useState(list)

    let alt = "gray_squre";
    return (
    <main>
        <nav className="d-flex justify-content-center">
            <button className="btn btn-primary m-2 button">Find random match</button>
            <button className="btn btn-primary m-2 button">Play against a friend</button>
        </nav>
        <div className="row p-5">
          <Image png={pngList[5]} alt={alt} />
          <Image png={pngList[6]} alt={alt} />
          <Image png={pngList[7]} alt={alt} />
          <Image png={pngList[8]} alt={alt} />
          <Image png={pngList[9]} alt={alt} />
        </div>

        <div className="row pt-5">
          <Dropdown number={0} pngList={pngList} setPngList={setPngList} />
          <Dropdown number={1} pngList={pngList} setPngList={setPngList} />
          <Dropdown number={2} pngList={pngList} setPngList={setPngList} />
          <Dropdown number={3} pngList={pngList} setPngList={setPngList} />
          <Dropdown number={4} pngList={pngList} setPngList={setPngList} />
        </div>

        <div className="row pb-5">
          <Image png={pngList[0]} alt={alt} />
          <Image png={pngList[1]} alt={alt} />
          <Image png={pngList[2]} alt={alt} />
          <Image png={pngList[3]} alt={alt} />
          <Image png={pngList[4]} alt={alt} />
        </div>
    </main>
    )
}

function Image({ png, alt }) {
  return (
  <div className="col d-flex justify-content-center">
    <img src={png} alt={alt} width="100px" />
  </div>
  )
}

function Dropdown({ number, pngList, setPngList }) {
  return (
    <div className="dropdown col d-flex justify-content-center">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Select
      </button>
      <ul className="dropdown-menu">
        <li><button className="dropdown-item" type="button" onClick={() => setElementInPngList(number, 'rock.png', pngList, setPngList)}>Rock</button></li>
        <li><button className="dropdown-item" type="button" onClick={() => setElementInPngList(number, 'paper.png', pngList, setPngList)}>Paper</button></li>
        <li><button className="dropdown-item" type="button" onClick={() => setElementInPngList(number, 'scissors.png', pngList, setPngList)}>Scissors</button></li>
      </ul>
    </div>
  )
}

function setElementInPngList(i, type, pngList, setPngList) {
  let newList = [...pngList];
  newList[i] = type;
  setPngList(newList);
}