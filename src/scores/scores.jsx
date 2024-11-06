import React from "react";
import './scores.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Scores() {
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
            <tbody>
                <tr>
                    <td>1</td>
                    <td>lDrac360l</td>
                    <td>36</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>yorgiwarrenater</td>
                    <td>32</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>RockCastle808</td>
                    <td>31</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Dragonnmaster7</td>
                    <td>-20</td>
                </tr>
            </tbody>
        </table>
    </main>
    );
}