console.log("loading the app.js file")

//bring in express framework
let express = require("express");

// define the PORT
let PORT = 8080;

// create application server object
let app = express();

// Make sure all of the data passing back and forth is in JSON fomrat
// using a middleware component
app.use(express.json())

// more vervose .... this is used in older code typically. 
// let bodyParser = express.son()
// app.use(bodyParser)

let database = [];  // this is just for testing. We don't really do this. 

app.get("/todos", (req, res) => {
    console.log("GET /todos")
    res.json(database);

    // you could get completed and not completed todos with this route
    // using query param, if/else, like hello


})

app.get("/todos/:id", (req, res) => {
    console.log("GET /todos/:id")

    let myId = req.params.id;

    let matchingItem = database.find((item, index) => {
        return item.id == myId
    })

    if (matchingItem) {
        res.json(matchingItem);
    } else {
        res.send("No ID found")
    }


})

app.delete("/todos/:id", (req, res) => {
    console.log("DELETE /todos/:id")

    let myID = req.params.id;

    // find the indexOf the item where item's id = myId and remove it

    let matchingIndex = database.findIndex((item, index) => {
        return item.id == myID;

    })

    if (matchingIndex) {
        let deletedItem = database.splice(matchingIndex, 1)
        res.json(deletedItem)
    } else {
        res.send("No matching ID. No record deleted.")
    }
})

app.post("/todos", (req, res) => {
    console.log("POST /todos")

    let newItem = {};
    newItem.id = getRandomInt();
    newItem.description = req.body.description;
    newItem.completed = false; //true or false


    // put in the database
    database.push(newItem);

    // return the newItem on the response
    res.json(newItem)
})

app.put("/todos/:id", (req, res) => {
    console.log("PUT /todos/:id")

    let myID = req.params.id

    let matchingItem = database.find((item, index) => {
        return item.id == myID;
    })


    let description = req.body.description
    let completed = req.body.completed == true;


    matchingItem.description = description
    matchingItem.completed = completed

    if (matchingItem) {
        res.json(matchingItem)
    } else {
        res.send("No item update.")
    }
    // get the param id from the route
    //find the item that matches the id
    // let matchingItem = find the matching item

    // to update the description, get the req.body.description
    // to update completed, get the req.body.completed

    // example: let completed = req.body.completed == true;

    //if you found it, put the completed var into the matchingItem.completed

    // example: matchingItem.completed = completed

    //res.json(matchingItem)
    //if else
    //res.send("No item update.")


})







// function that returns a random integer
const getRandomInt = () => {
    let randomFloat = Math.random();
    let bigRandomFloat = randomFloat * 10000
    let randomInt = Math.floor(bigRandomFloat);

    return randomInt;
}




app.listen(PORT, () => { console.log("Application is listening on port", PORT) })