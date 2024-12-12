import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import { chatWebSocket } from "./chatWebSocket";


export default function Chat({ username }) {
    const [currentText, setCurrentText] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    return (
        <main>
            <input className="form-control m-4" style={{ width: "500px" }}></input>
            <Button
                type="submit"
                className="btn btn-primary m-2 button justify-content-center"
                onClick={sendMessage}
            >
                Send message!
            </Button>
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
    function sendMessage() {
        chatWebSocket.sendMessage({ username, message})
    }
}