"use strict";

var express = require("express");
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

var cors = require("cors");

const postController = require("./controller/post_controller");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Basic Configuration
var port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl/new", postController.addPost);

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:number", postController.showPost);

const uri = "mongodb://johnnygat:123567900a@ds359868.mlab.com:59868/url-shortner"

mongoose.connect(uri,{useNewUrlParser: true})
  .then(() => app.listen(3000)
  .catch(err => console.log(err));