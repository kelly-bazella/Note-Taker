var express = require("express");
var app = express();
var fs = require("fs")
var PORT = 8000
var bodyParser = require('body-parser')
var notes = JSON.parse(fs.readFileSync("./db/db.json"))
var path = require('path');
var allNotes = JSON.parse(fs.readFileSync("./db/db.json"))
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "Develop/public")));

// routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./db/db.json"))
});

app.post("/api/notes", function(req, res){
  let newNote = req.body;
  newNote.id = allNotes.length+1;
  allNotes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(allNotes), function(err){
        if(err) throw err;
        })
    res.json(newNote)
});

app.delete("/api/notes/:id", function (req, res){
  try {
    allNotes = fs.readFileSync("./db/db.json", "utf-8");
    allNotes = JSON.parse(allNotes);
    allNotes = allNotes.filter(function(note) {
      return note.id != req.params.id;
    });
    allNotes = JSON.stringify(allNotes);
    fs.writeFile("./db/db.json", allNotes, "utf8", function(err) {
      //
      if (err) throw err;
    });
    res.send(JSON.parse(allNotes));
  } catch (err) {
    throw err;
  }
});

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });