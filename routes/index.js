const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const router = express.Router();
require('dotenv').config();

//Create Connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

// router.post('/check', function(req, res) {
//   console.log(add_name);
//   console.log('req received');
  // res.redirect('/');
// });
//route for homepage
router.get('/',(req, res) => {
  let sql = "SELECT * FROM student";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('index',{
      results: results
    });
  });
});

//route for insert data
router.post('/save',(req, res) => {
  let data = {uname: req.body.add_name, email: req.body.add_email, mobile: req.body.add_mobile, address: req.body.add_address, city: req.body.add_city};
  let sql = "INSERT INTO student SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
router.put('/update',(req, res) => {
  let sql = "UPDATE student SET uname='"+req.body.update_name+"', email='"+req.body.update_email+"', mobile='"+req.body.update_mobile+"' , address='"+req.body.update_address+"' , city='"+req.body.update_city+"' WHERE id="+req.body.update_id;
  // let sql = "UPDATE student SET uname='Satyam', email='Satyam@gmail.com', mobile='22222222222' , address='btm' , city='bangalore' WHERE id="+req.body.id;

  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
router.delete('/delete',(req, res) => {
  let sql = "DELETE FROM student WHERE id="+req.body.delete_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening

module.exports = router;