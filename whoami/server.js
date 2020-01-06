"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const accepts = require('accepts');


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

app.get("/api/whoami", function(req,res) {
	request("https://api.smartip.io/?api_key=9bad3bdc-9611-412d-b1ed-484dbdaf722b", function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	body = JSON.parse(body)
	    	res.json({
				ipaddress: body.ip,
				language: accepts(req).languages().toString(),
				software: req.get('User-Agent')
			})
	    } else {
	      res.end('Error: ' + error);
	    }
	})


});

app.listen(3000,() => console.log("Server running on port 3000"))