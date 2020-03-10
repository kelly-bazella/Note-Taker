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
  let userNotes = [];
  let newNote = req.body;
  userNotes.push(newNote);
  for (var i = 0; i<userNotes.length; i++){
    newNote.id = i
    fs.writeFile("./db/db.json", JSON.stringify(userNotes), function(err){
        if(err) throw err;
        })
    res.json(newNote)
  }
})

app.delete("/api/notes/:id", function (req, res){
  try {
    userNotes = fs.readFileSync("./db/db.json", "utf-8");
    userNotes = JSON.parse(userNotes);
    userNotes = userNotes.filter(function(note) {
      return note.id != req.params.id;
    });
    userNotes = JSON.stringify(userNotes);
    fs.writeFile("./db/db.json", userNotes, "utf8", function(err) {
      //
      if (err) throw err;
    });
    res.send(JSON.parse(userNotes));
  } catch (err) {
    throw err;
  }
});

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });