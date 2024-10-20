import express from "express";
import cors from "cors";

// config ->
const app = express();

// Middlewares -->
app.use(express.json());

//corse setup :
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// api end-points
app.get("/", (req, res) => {
  res.send("This api is working");
});


export default app 
