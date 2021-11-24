//jshint esversion:8

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));



async function main() {
  await mongoose.connect('mongodb://localhost:27017/wikiDB', {userNewUrlParser:true});
}

//Model for each Article
const articleSchema ={
  title: String,
  content: String
};

//Schema for each  Article
const Article = mongoose.model("Article", articleSchema );



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
