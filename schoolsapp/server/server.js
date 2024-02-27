import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unicon",
});

app.post("/register", upload.single("image"), (req, res) => {
  const { name, email, address, city, state, contact } = req.body;

  const values = [
    name,
    email,
    address,
    city,
    state,
    contact,
    req.file.filename,
  ];

  const sql =
    "INSERT INTO schools (name,email_id,address,city,state,contact,image) VALUES (?)";

  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/", (req, res) => {
  const sql = "select * from schools";
  db.query(sql, (err, result) => {
    if (err) return res.json("Error");
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Running");
});
