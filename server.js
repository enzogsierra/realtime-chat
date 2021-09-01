/* 
    SERVER-SIDE SCRIPT  
*/ 

// Require socket.io and run a server in port 3000 - Fix CORS issues
const io = require("socket.io")(3000, {cors: {origin: "*",}}); 
const users = {};


// Called when a user connects
io.on("connection", socket => 
{
    // When a new user joins chat
    socket.on("join", name => 
    {
        users[socket.id] = name; // Save user name
        socket.broadcast.emit("chat-message", `${name} joined chat`); // Send message to all users except user who joined
    })

    // When user disconnects (close/reload tab/browser)
    socket.on("disconnect", () =>
    {
        socket.broadcast.emit("chat-message", `${users[socket.id]} disconnected`);
        delete users[socket.id]; // Delete var
    });
    

    // When server receives a user chat message
    socket.on("user-send-message", msg => 
    {
        socket.broadcast.emit("chat-message", msg); // Emit: Send chat-message to every user connected; Broadcast: except user sending
    });
});
