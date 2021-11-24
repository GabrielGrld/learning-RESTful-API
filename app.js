//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));



mongoose.connect('mongodb://localhost:27017/wikiDB');


//Model for each Article
const articleSchema ={
  title: String,
  content: String
};

//Schema for each  Article
const Article = mongoose.model("article", articleSchema );


//Get all the articles using articles route
app.get("/articles", function(req, res){
Article.find(function(err, foundArticles){
console.log(foundArticles);
  if (!err){
    res.send(foundArticles);
  }else{
    res.send(err);
  }
});
});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
