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

//retrieve JSON data
app.use(express.json());

//Makes sure that URL encoder data is inputted to the right place/ 
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
    res.sendFile("public/notes.html", { root: __dirname })
})

app.get("/api/notes", (req, res) => {
    res.json(jsonData)
})

//make a POST request to the dbjson to change the file with these elements. 
app.post("/api/notes", (req, res) => {
    console.log(jsonData, "this is THE REEAL STUFF")
    console.log(req.body);
    // let obj = []
    jsonData.push({ title: req.body.title, text: req.body.text })
    let noteData = JSON.stringify(jsonData)
    fs.writeFile("./db/db.json", noteData, (err, data) => {
        if (err) {
            console.log(err)
        } res.json(noteData)
    })
})

//retrieve the informaiton/file and send it or show it. There are the GET requests to read the dbjson and return all saved notes.
app.get("/", (req, res) => {
    res.sendFile("index.html")
})

//Get the app to listen to the appropriate host. 
app.listen(process.env.PORT || 3000, () => {
    //use console log to ensure that it is working. 
    console.log("listening to server")
});

