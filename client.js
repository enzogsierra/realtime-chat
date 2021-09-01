/* 
    CLIENT-SIDE SCRIPT 
*/

// Get socket info from port 3000
const socket = io("http://localhost:3000"); 


// Get user name
//const username = (prompt("Type your name:") ? (username) : (`User_${Math.floor(Math.random() * 100)}`)); // Get user name or generate a random one
const username = `User_${Math.floor(Math.random() * 100)}`;
socket.emit("join", username);
appendMsg(`You joined chat as ${username}`);


// When user receive an event from chat-message
socket.on("chat-message", msg =>
{
    appendMsg(msg);
});


// -- Form
const form = document.getElementById("form"); // Select <form>
const msg = document.getElementById("form-msg"); // Select what user wrote

form.addEventListener("submit", e => // When user submits a message
{
    e.preventDefault(); // Prevent browser to refresh

    appendMsg(`You: ${msg.value}`);
    socket.emit("user-send-message", `${username}: ${msg.value}`); // Send what user wrote to the server
    msg.value = ""; // Clear user chat input
    
});


// Function to append new messages in chat
function appendMsg(msg)
{
    const chat = document.querySelector(".chat")
    const div = document.createElement("div");

    div.innerHTML = msg;
    chat.append(div);
    chat.scrollTop = chat.scrollHeight; // Auto chat scroll
}
