const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const userRoutes=require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
dotenv.config()
const connectDatabase=require("./config/db")
 
const app=express()
connectDatabase();


app.use(cors())
app.use(express.json());
app.use("/api/user",userRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


const server=app.listen(process.env.PORT,()=>{
  console.log(`server is connected port ${process.env.PORT}`)
})

const io = require("socket.io")(server, {
  pingTimeout: 60000, 
  cors: {
    origin: "http://localhost:3000", 
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});


