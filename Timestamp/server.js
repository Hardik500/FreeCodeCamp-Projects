"use strict";

var express = require("express");
const bodyParser = require('body-parser');

var cors = require("cors");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Basic Configuration
var port = process.env.PORT || 3000;

app.use(cors());

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function dateFormat(d){
	var pattern = new RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$','gi');
	return !!pattern.test(d);
}

app.use(express.static('public'));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/timestamp/:date_string", function(req,res) {
	const date = req.params.date_string;
	if(date.length == 0){
		res.json({
			unix: Date.now(),
			utc: new Date().toUTCString()
		})
	}
	else if(isValidDate(new Date(parseInt(date)))){
		if(dateFormat(date)){
			res.json({
				unix: new Date(date).getTime(),
				utc: new Date(date).toUTCString()
			})
		}
		else{
			res.json({
				unix: parseInt(date),
				utc: new Date(date*1000).toUTCString()
			})
		}
	}

	else{
		res.json({
				error : "Invalid Date"
			})
	}
})

app.listen(3000,() => console.log("Server running on port 3000"))