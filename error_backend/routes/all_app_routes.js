import db from "../models/database.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { loginSchema, signUpSchema } from "../validators/auth_validator.js";

export const insertErrorsData = async (req, res) => {
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
      },
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}; //

export const findUserErrors = (req, res) => {
  const user_id = req.user.id;

  const sql = "SELECT * FROM errors WHERE user_id=? ORDER BY id DESC ";

  db.query(sql, [user_id], (err, result) => {
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
};

export const usersLanguage = (req, res) => {
  const user_id = req.user.id;
  const { language } = req.params;

  const sql =
    "SELECT * FROM errors WHERE language = ? AND user_id=? ORDER BY id DESC";

  db.query(sql, [language, user_id], (err, result) => {
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
};

export const deleteUserData = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const sql = "DELETE FROM errors WHERE id=? AND user_id=?";

  db.query(sql, [id, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.json({ message: "User deleted successfully.", result: result });
  });
};

export const errorsCount = (req, res) => {
  const user_id = req.user.id;

  const sql =
    "SELECT language, COUNT(*) as count FROM errors WHERE user_id=? GROUP BY language";

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, data: [] });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};

export const userSignUp = async (req, res) => {
  console.log("Req body👉", req.body);

  try {
    //this code check userdata using zod
    const validation = await signUpSchema.safeParse(req.body);

    if (!validation.success) {

      console.log("ZOD ERROR: " ,validation.error.format());

      return res.status(400).json({
        message: "Validation failed",
        error: validation.error.format(),
      });
    }

    const { name, email, phone, password } = validation.data;

    const checkSql = "SELECT * FROM users WHERE email=?";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        console.error("Check user error", err);
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Your email & password already exists",
        });
      }
      const hashPassword = await argon2.hash(password);

      const insertSql =
        "INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)";

      db.query(insertSql, [name, email, phone, hashPassword], (err, result) => {
        if (err) {
          console.error("Insert user error:", err);
          return res.status(500).json({
            message: "Database error",
          });
        }

        //auto login jwt token

        const token = jwt.sign(
          {
            id: result.insertId,
            email,
          },
          process.env.JWT_SECRET,

          {
            expiresIn: "1h",
          },
        );

        console.log("JWT_SECRET", process.env.JWT_SECRET);

        return res.status(200).json({
          message: "Signup & Login Successfully",
          token: token,
          user: {
            id: result.insertId,
            name,
            email,
          },
        });

       
      });
    });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userLogin = async (req, res) => {
  console.log("Req body👉", req.body);

  try {
    const validation = await loginSchema.safeParse(req.body);

    if (!validation.success) {
      console.log("Email and password not correctly");

      return res.status(400).json({
        message: "Validation failed",
        error: validation.error.format(),
      });
    }

    const { email, password } = validation.data;

    const sql = "SELECT * FROM users WHERE email=?";

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

      // jwt login token

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,

        {
          expiresIn: "1h",
        },
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
};
