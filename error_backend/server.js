import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth.js";
import { deleteUserData, errorsCount, findUserErrors, insertErrorsData, userLogin, userSignUp, usersLanguage } from "./routes/all_app_routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully 🚀");
});

const PORT = 5000;


app.post("/errors", authMiddleware, insertErrorsData);

app.get("/errors", authMiddleware, findUserErrors);

app.get("/errors/:language", authMiddleware, usersLanguage);

//delete api

app.delete("/errors/:id", authMiddleware, deleteUserData);

//give the count of errors

app.get("/errors-count", authMiddleware, errorsCount);

//signup api

app.post("/signup", userSignUp,authMiddleware);

//login api

app.post("/login", userLogin,authMiddleware);

app.listen(PORT, () => {
  console.log(`🔥Server is running at port: ${PORT}`);
});
