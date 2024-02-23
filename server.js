//server.js 


const express = require("express");
const app = express();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
  con.query("create database myPage",function(err,result){
    if (err) throw err;
    console.log("Database created");
  });
  
});
module.exports = app;