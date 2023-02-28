const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
const port = process.env.PORT || 5000;

// Connect local mysql database
// let db;
// db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "Somalia@1987",
//     database: "soccer-db",
//   });

// const db = mysql.createConnection({
//   host: "localhost", 
//   user: "root", 
//   password: "Somalia@1987", 
//   database: "soccer-db" 
// });

// create a connection variable with the required details
const db = mysql.createConnection({
  host: "soccerdb.cavria1dxcva.us-east-2.rds.amazonaws.com", 
  user: "admin", 
  password: "Realmadrid2023",
  database: "soccerdb" 
});
 
// make to connection to the database.
db.connect(function(err) {
  if (err) throw err;
  // if connection is successful
 console.log('connection successful');
});



app.get('/',(req,res)=>{
  res.json('OK');
});

// app.post('/',(req,res)=>{
// 	var {name,stadium} =req.body;
// 	var records = [[req.body.name,req.body.stadium]];
// 	if(records[0][0]!=null)
// 	{
// 		db.query("INSERT into student (name,stadium) VALUES ?",[records],function(err,res,fields){

// 			if(err) throw err;

// 			console.log(res);
// 		});
// 	}
// 	res.json('Form received.');
// });

  // app.get("/api/get", (req, res) => {
  //   const sqlGet = "SELECT * FROM teams";
  //     db.query(sqlGet, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(result);
  //       }
  //     });
  //   });
  
  app.post("/api/post", (req, res) => {
    const {name, stadium} = req.body
    const sqlInsert = "INSERT INTO teams (name, stadium) VALUES ('Arsenal', 'Emirates')" 
    db.query(sqlInsert, [ name, stadium ],(err, result) => {
      if (err){
        console.log("Error", error);
      } else{
        console.log("Result", result);
      }
    })
  });
  
  // app.delete("/api/remove/:id", (req, res) => {
  //   const { id } = req.params;
  //   const sqlRemove = "DELETE FROM teams WHERE id = ?";
  //   db.query(sqlRemove, id, (error, result) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //   });
  // });
  
  // app.get("/api/get/:id", (req, res) => {
  //   const { id } = req.params;
  //   const sqlGet = "SELECT * FROM teams WHERE id = ?";
  //   db.query(sqlGet, id, (error, result) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     res.send(result);
  //   });
  // });
  
  // app.put("/api/update/:id", (req, res) => {
  //   const { id } = req.params;
  //   const {name, stadium} = req.body;
  //   const sqlUpdate = "UPDATE teams SET name = ?, stadium = ? WHERE id = ?";
  //   db.query(sqlUpdate, [name, stadium, id], (error, result) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     res.send(result);
  //   });
  // });

// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO Teams (name, stadium) VALUES ('Real Madrid', 'Santiago')" 
//     db.query(sqlInsert, (error, result) => {
//     if (error){
//         console.log("Error", error);
//     }else{
//       console.log("Result", result);
//       res.send("MYSL database");
//     }
//     });
//   });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });