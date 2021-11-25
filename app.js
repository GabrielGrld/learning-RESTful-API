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


//////////////////////////////////// Requests Targetting A All Articles //////////////////////////////////
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



//////////////////////////////////// Requests Targetting A Specific Article //////////////////////////////////
app.route("/articles/:articlesName")

.get(function(req, res){
const specificArticle = req.params.articlesName;
Article.findOne({title:specificArticle}, function(err, foundArticle){
  if(foundArticle){
    res.send(foundArticle);
  }else{
    res.send("No articles matching that title");
  }
});
})

.put(function(req, res){
  const specificArticle = req.params.articlesName;
Article.updateOne(
  {title:specificArticle},
   {title: req.body.title,
   content: req.body.content},
    function(err){
     if(!err){
       res.send("Article updated!");
     }
   });
})
.patch(function(req, res){
  const specificArticle = req.params.articlesName;
Article.updateOne(
  {title:specificArticle},
   {title: req.body.title,
   content: req.body.content},
    function(err){
     if(!err){
       res.send("Article updated!");
     }
   });
}).delete(function(req, res){
  const specificArticle = req.params.articlesName;
  Article.deleteOne({}, function(err){
    if(!err){
      res.send("Article Deleted");
    }
  });
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
