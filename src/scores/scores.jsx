import React from "react";
import './scores.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Scores() {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/scores')
            .then((response) => response.json())
            .then((scores) => {
                setScores(scores);
            });
    }, []);
    let scoreRows = [];
    for (index in scores) {
        scoreRows.push(<Score index={index} />)
    }

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
                <tbody>{scoreRows}</tbody>
            </table>
        </main>
    );
}

function Score({ index }) {

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{scores[index].name}</td>
            <td>{scores[index].score}</td>
        </tr>
    )
}