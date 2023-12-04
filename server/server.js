const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./document");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");

const cors = require("cors");
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://patolbau:1234@cluster0.m1t7are.mongodb.net/"
    );
    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
};

dbConnect();
const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const defaultValue = "";
io.on("connection", (socket) => {
  console.log("Socket Connected");
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("recieve-changes", delta);
    });
  });
  socket.on("save-document", async (data) => {
    // console.log("Saving Document");
    // console.log(data);
    await Document.findByIdAndUpdate(data.id, {
      data: data.content, // Use data.content instead of data
      creator: data.user,
    });
  });
});

const findOrCreateDocument = async (id) => {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({
    _id: id,
    data: defaultValue,
  });
};

app.use("/api", userRoutes);
app.use("/api/documents", documentRoutes);
httpServer.listen(3000);
