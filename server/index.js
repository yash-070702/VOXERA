const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit"); // it will limit the number of client request for a limit period of time
const helmet = require("helmet");
const morgan = require("morgan"); // used in Express.js applications to log requests for tracking, debugging, or performance analysis.
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chats")
const http = require("http");
const mongoSanitize = require("express-mongo-sanitize"); // sanitizing input data to prevent security vulnerabilities such as cross-site scripting (XSS) or SQL injection.
const User = require("./models/User");
const path=require("path");
const OneToOneMessage =require("./models/oneToOneMessage"); 
const FriendRequest=require("./models/friendRequest")
// Setting up port number
const PORT = process.env.PORT || 4000;

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); // Bind Socket.IO to the server
// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
// Middleware for parsing application/json
app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: "Too many Requests from this IP, please try again in an hour!", // this is used to prevent server from crashing due to large number of request from a single IP
});
app.use("/voxera", limiter); // only used for those request that start with voxera
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(mongoSanitize());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat",chatRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});



io.on("connection", async (socket) => {
  console.log("hello", JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query["user_id"];
  const socket_id = socket.id;
  console.log("A user connected", socket_id);

  if (user_id != null && Boolean(user_id)) {
    await User.findByIdAndUpdate(user_id, { socket_id: socket.id,status:"Online" });
  }

  // we can write our socket event listeners here ....

  socket.on("friend_request", async (data) => {
    console.log(data.to); // to is some user id

    const to = await User.findById(data.to).select("socket_id");
    const from = await User.findById(data.from).select("socket_id");

    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });
    io.to(to?.socket_id).emit("new_friend_request", {
      message: "New friend request received",
    });
    io.to(from?.socket_id).emit("request_sent", {
      message: "Request Sent successfully!",
    });
  }); // we are sending an message to a user that you have a friend request

  socket.on("accept_request", async (data) => {
    // accept friend request => add ref of each other in friends array
    console.log(data);
    const request_doc = await FriendRequest.findById(data.request_id);

    console.log(request_doc);

    const sender = await User.findById(request_doc.sender);
    const receiver = await User.findById(request_doc.recipient);

    sender.friends.push(request_doc.recipient);
    receiver.friends.push(request_doc.sender);

    await receiver.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    await FriendRequest.findByIdAndDelete(data.request_id);

    // emit event request accepted to both
    io.to(sender?.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
    io.to(receiver?.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });

  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    const existing_conversations = await OneToOneMessage.find({
      participants: { $all: [user_id] },
    }).populate("participants", "firstName lastName avatar _id email status");
    

    console.log(existing_conversations);

    callback(existing_conversations);
  });

  socket.on("start_conversation", async (data) => {
    // data: {to: from:}
console.log(data);
    const { to, from } = data;
console.log(to,from);
    // check if there is any existing conversation

    const existing_conversations = await OneToOneMessage.find({
      participants: { $size: 2, $all: [to, from] },
    }).populate("participants", "firstName lastName _id email status");

    console.log(existing_conversations[0], "Existing Conversation");

    // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
    if (existing_conversations.length === 0) {
      let new_chat = await OneToOneMessage.create({
        participants: [to, from],
      });

      new_chat = await OneToOneMessage.findById(new_chat).populate(
        "participants",
        "firstName lastName _id email status"
      );

      console.log(new_chat);

      socket.emit("start_chat", new_chat);
    }
    // if yes => just emit event "start_chat" & send conversation details as payload
    else {
      socket.emit("start_chat", existing_conversations[0]);
    }
  });

  socket.on("get_messages", async (data, callback) => {
    try {
      const { messages } = await OneToOneMessage.findById(
        data.conversation_id
      ).select("messages");
      callback(messages);
    } catch (error) {
      console.log(error);
    }
  });


  socket.on("text_message", async (data) => {
    console.log("Received message:", data);

    // data: {to, from, text}

    const { message, conversation_id, from, to, type } = data;

    const to_user = await User.findById(to);
    const from_user = await User.findById(from);

    // message => {to, from, type, created_at, text, file}

    const new_message = {
      to: to,
      from: from,
      type: type,
      created_at: Date.now(),
      text: message,
    };

    // fetch OneToOneMessage Doc & push a new message to existing conversation
    const chat = await OneToOneMessage.findById(conversation_id);
    chat.messages.push(new_message);
    // save to db`
    await chat.save({ new: true, validateModifiedOnly: true });

    // emit incoming_message -> to user

    io.to(to_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });

    // emit outgoing_message -> from user
    io.to(from_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });
  });


  socket.on("file_message", (data) => {
    console.log("Received message:", data);

    // data: {to, from, text, file}

    // Get the file extension
    const fileExtension = path.extname(data.file.name);

    // Generate a unique filename
    const filename = `${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}${fileExtension}`;

    // upload file to AWS s3

    // create a new conversation if its dosent exists yet or add a new message to existing conversation

    // save to db

    // emit incoming_message -> to user

    // emit outgoing_message -> from user
  });

  socket.on("disconnect", async (data) => {
    // Find user by ID and set status as offline

    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
    }

    // broadcast to all conversation rooms of this user that this user is offline (disconnected)

    console.log("closing connection");
    socket.disconnect(0);
  });
});

server.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});