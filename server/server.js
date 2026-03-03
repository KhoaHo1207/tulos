import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./db/dbConnect.js";
import initRoute from "./routes/index.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

ConnectDB();
initRoute(app);

app.get("/", (req, res) => {
  return res.send("serevr is running on....");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
