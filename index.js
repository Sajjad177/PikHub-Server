import express from "express";
import cors from "cors";
import { connectCloudinary } from "./config/cloudinary.js";
import { userRoute } from "./routes/userRoute.js";
import { productRouter } from "./routes/productRoute.js";




// config ->
const app = express();
connectCloudinary()

// Middlewares -->
app.use(express.json());

//corse setup :
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


//router --> 
app.use("/api/user", userRoute)
app.use("/api/product",productRouter)

// api end-points
app.get("/", (req, res) => {
  res.send("This api is working");
});


export default app 
