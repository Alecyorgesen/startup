import React from "react";
import './scores.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Scores() {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/scores')
            .then((response) => response.json())
            .then((highScores) => {
                let scoreRows = [];
                for (let [index, score] of highScores.entries()) {
                    scoreRows.push(<Score index={index} username={score.username} score={score.score} />);
                    setScores(scoreRows);
                }
            });
    }, [])

    return (
        <main>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody>{scores}</tbody>
            </table>
        </main>
    );
    function Score({ index, username, score }) {

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{username}</td>
                <td>{score}</td>
            </tr>
        )
    }
}