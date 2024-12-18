import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import { chatWebSocket } from "./chatWebSocket";


export default function Chat({ username }) {
    const [currentText, setCurrentText] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    return (
        <main>
            <input
                className="form-control m-4"
                style={{ width: "500px" }}
                onChange={(event) => setCurrentText(event.target.value)}
            >

            </input>
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
        chatWebSocket.sendMessage("message", { username, currentText });
        let newList = [...messages];
        newList.push(<ChatMessage username={username} message={currentText} />);
        setCurrentText('');
    }

    // function getMessage(){
    //     let newList = [...messages];
    //     newList.push(<ChatMessage username={username} message={currentText} />);
    // }
}