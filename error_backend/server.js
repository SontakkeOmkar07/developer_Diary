import express from "express";
import cors from "cors";
import db from "./models/database.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully 🚀");
});

const PORT = 5000;

app.post("/errors", async (req, res) => {
  console.log("Req body👉", req.body);

  try {
    const { title, message, rootCause, tags, steps, language } = req.body;

    if (!language) {
      return res.status(400).json({ message: "Language is required" });
    }

    const sql =
      "INSERT INTO users (title,message,rootCause,tags,steps,language) VALUES (?,?,?,?,?,?)";

    db.query(
      sql,
      [title, message, rootCause, tags, JSON.stringify(steps), language],
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

app.get("/errors", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY id DESC ";

  db.query(sql, (err, result) => {
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

app.get("/errors/:language", (req, res) => {
  const { language } = req.params;

  const sql = "SELECT * FROM users WHERE language = ? ORDER BY id DESC";

  db.query(sql, [language], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, data: []  });
    }


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

app.listen(PORT, () => {
  console.log(`🔥Server is running at port: ${PORT}`);
});
