//declare the appropriate and needed variables. 
const express = require("express")
const path = require("path")
const fs = require("fs")
let jsonData = require("./db/db.json")
const bodyParser = require("body-parser")
const { json } = require("express")
const { request } = require("http")
const app = express()

console.log(JSON.stringify(jsonData, null, 2));

//define the path that should be used to get access to the required files. In this case, the important files are in the public folder. 
app.use("/", express.static(path.join(__dirname, "public")))
console.log(__dirname);

app.use(express.json());

//retrieve the informaiton/file and send it or show it. There are the GET requests to read the dbjson and return all saved notes.
app.get("/", (req, res) => {
    res.sendFile("index.html")
})
app.get("/notes", (req, res) => {
    res.sendFile("public/notes.html", { root: __dirname })
})

app.get("/api/notes", (req, res) => {
    res.json(jsonData)
})

//make a POST equest to the dbjson to change the file with these elements. 
app.post("/api/notes", (req, res) => {
    res.json(jsonData)
    console.log(req.body);
})


//Get the app to listen to the appropriate host. 
app.listen(7000, () => {
    //use console log to ensure that it is working. 
    console.log("listening to server")
});


// fs.writeFile()