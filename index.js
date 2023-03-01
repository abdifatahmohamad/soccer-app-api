const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
require('dotenv').config();
const port = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
 
// Make to connection to the database.
db.connect(function(err) {
  if (err) throw err;
 console.log('connection successful');
});

app.get('/',(req,res)=>{
  res.json('OK');
});


app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM teams";
    db.query(sqlGet, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.post("/api/post", (req, res) => {
  const {name, stadium} = req.body
  const sqlInsert = "INSERT INTO teams (name, stadium) VALUES (?, ?)" 
  db.query(sqlInsert, [ name, stadium ],(err, result) => {
    if (err){
      console.log("Error", error);
    } else{
      console.log("Result", result);
    }
  })
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM teams WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM teams WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const {name, stadium} = req.body;
  const sqlUpdate = "UPDATE teams SET name = ?, stadium = ? WHERE id = ?";
  db.query(sqlUpdate, [name, stadium, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });