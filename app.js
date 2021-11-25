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
const articleSchema = {
  title: String,
  content: String
};

//Schema for each  Article
const Article = mongoose.model("article", articleSchema);

app.route("/articles")
.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res) {
  const articleToSave = new Article({
    title: req.body.title,
    content: req.body.content
  });
  articleToSave.save(function(err) {
    if (!err) {
      res.send("New article added");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res) {
  Article.deleteMany({}, function(err) {
    if (!err) {
      res.send("Items deleted");
    } else {
      res.send(err);
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
