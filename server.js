var express = require("express");
var app = express();
var fs = require("fs")
var PORT = 8000
var bodyParser = require('body-parser')
var notes = JSON.parse(fs.readFileSync("./db/db.json"))
var path = require('path');

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "Develop/public")));

let userNotes = [];
console.log(userNotes)
// routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
  return res.sendFile(path.join(__dirname, "./db/db.json"))
});

app.post("/api/notes", function(req, res){
  console.log(res)
  // let title = req.body.title;
  // let text = req.body.text;
  // title.push(userNotes)
  // text.push(userNotes)
  userNotes= fs.readFileSync("")
  fs.writeFile("./db/db.json", JSON.stringify(userNotes),"utf8", function(err){
    if (err) throw err;
  })
  res.json(JSON.parse(userNotes))
})

app.delete("/api/notes/:id", function (req, res){

})

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });