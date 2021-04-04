//declare the appropriate and needed variables. 
const express = require("express")
const path = require("path")
const app = express()

//define the path that should be used to get access to the required files. In this case, the important files are in the public folder. 
app.use("/", express.static(path.join(__dirname, "public")))
console.log(__dirname);

//retrieve the informaiton/file and send it or show it
app.get("/", (req, res) => {
    res.sendFile("index.html")
})
app.get("/notes", (req, res) => {
    res.sendFile("public/notes.html", { root: __dirname })
})

//Get the app to listen to the appropriate host. 
app.listen(7000, () => {
    //use console log to ensure that it is working. 
    console.log("listening to server")
});





