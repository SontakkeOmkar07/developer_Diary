import express from "express";
import cors from "cors";
import db from "./models/database.js";
import argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully 🚀");
});

const PORT = 5000;

app.post("/errors", authMiddleware, async (req, res) => {
  
  console.log("Req body👉", req.body);

  try {
    const { title, message, rootCause, tags, steps, language } = req.body;

    if (!language) {
      return res.status(400).json({ message: "Language is required" });
    }

    const user_id = req.user.id;

    const sql =
      "INSERT INTO errors (title,message,rootCause,tags,steps,language,user_id) VALUES (?,?,?,?,?,?,?)";

    db.query(
      sql,
      [
        title,
        message,
        rootCause,
        tags,
        JSON.stringify(steps),
        language,
        user_id,
      ],
      (err, result) => {
        if (err)
          return res.status(500).json({ message: "Database not inserted" });

        console.log("Inserting into DB:", req.body);
        console.log("SQL:", sql);

        res.status(201).json({
          message: "Saved Successfully",

          data: { id: result.insertId, ...req.body },
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

app.get("/errors", authMiddleware , (req, res) => {

  const user_id= req.user.id;

  const sql = "SELECT * FROM errors WHERE user_id=? ORDER BY id DESC ";

  db.query(sql,[user_id],(err, result) => {
    if (err) return res.status(500).json({ success: false, data: [] });

    const parsed = result.map((item) => ({
      ...item,
      steps: JSON.parse(item.steps || "[]"),
    }));
    res.status(200).json({
      success: true,
      data: parsed,
    });
  });
});

app.get("/errors/:language", authMiddleware,  (req, res) => {


  const user_id = req.user.id;
  const { language } = req.params;

  const sql = "SELECT * FROM errors WHERE language = ? AND user_id=? ORDER BY id DESC";

  db.query(sql, [language,user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, data: [] });
    }

    const parsed = result.map((item) => ({
      ...item,
      steps:
        typeof item.steps === "string"
          ? JSON.parse(item.steps)
          : item.steps || "[]",
    }));
    res.status(200).json({
      success: true,
      data: parsed,
    });
  });
});

//delete api

app.delete("/errors/:id",authMiddleware, (req, res) => {
  const { id } = req.params;
    const user_id = req.user.id;


  const sql = "DELETE FROM errors WHERE id=? AND user_id=?";

  db.query(sql, [id,user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.json({ message: "User deleted successfully.", result: result });
  });
});

//give the count of errors

app.get("/errors-count", authMiddleware,(req, res) => {


  const user_id = req.user.id;

  const sql =
    "SELECT language, COUNT(*) as count FROM errors WHERE user_id=? GROUP BY language";

  db.query(sql,[user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, data: [] });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

//signup api

app.post("/signup", async (req, res) => {
  console.log("Req body👉", req.body);

  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const hashPassword = await argon2.hash(password);

    const sql =
      "INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)";

    db.query(sql, [name, email, phone, hashPassword], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }
      return res.status(201).json({
        message: "User registered successfull",
        userId: result.insertId,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//login api

app.post("/login", async (req, res) => {
  console.log("Req body👉", req.body);

  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    if (!email || !password) {
      console.log("Email and password not correctly");

      return res.status(400).json({
        message: "Please fill your email and password correctly",
      });
    }

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          result: result,
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "User not registered",
          result: result,
        });
      }

      const user = result[0];

      const isMatch = await argon2.verify(user.password, password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Please fill your email and password correctly",
        });
      }

      //jwt token

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,

        {
          expiresIn: "1h",
        }
      );

      console.log("JWT_SECRET", process.env.JWT_SECRET);

      return res.status(200).json({
        message: "Login Successfully",
        token: token,
        user: user.id,
      });
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Login Failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🔥Server is running at port: ${PORT}`);
});
