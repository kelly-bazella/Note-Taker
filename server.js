var express = require("express");
var app = express();
var fs = require("fs")
var PORT = 8000
var bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})


// routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});


// API call to get notes to display to page

// User note to JSON file

// 


// listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });