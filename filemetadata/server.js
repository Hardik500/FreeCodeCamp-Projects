"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs")
const formidable = require('formidable');

var cors = require("cors");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Basic Configuration
var port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
	 	console.log(files.upfile)
	 	res.json({
	 		name: files.upfile.name,
	 		type: files.upfile.type,
	 		size: files.upfile.size
	 	})
	   	res.end();
	})
})

app.listen(3000,() => console.log("Server running on port 3000"))