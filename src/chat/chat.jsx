import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";

export default function Chat() {
    const [messages, setMessages] = React.useState([]);

    return (
        <main>
            <input className="form-control m-4" style={{ width: "500px" }}></input>
            <Button ></Button>
            <ul className="list-group m-5">
                {messages}
            </ul>
        </main>
    );
    function ChatMessage({ username, message }) {

        return (
            <li>{username}: {message}</li>
        )
    }
}