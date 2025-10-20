import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();


//app config
const app = express();
const PORT = 4000

//middleware
app.use(express.json());
app.use(cors()); //access the backend from frontend

app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

//db Connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter);

app.use('/images', express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
