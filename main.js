console.log('Hello world')

//bringing in the functions provided by the express
const express = require('express');

//create an application object using express

let app = express();

// we use all caps because it is global
// 8080 is basically a channel for communication
let PORT = 8080;

// this is where we will write out code

//we're at domain localhost:8080
//you need to make sure you have npm start running in your terminal 
// for local host to actually work. 
//first get request
app.get("/hello", (req, res) => {
    res.send("hello from the hello route")
})
//the route is hello, (look at postman)
//for any request where the route is ".hello"
//send this string as the response

// write a GET route definition that will let me get by an id
// request /hello/Sasha
// request /hello/David

// request parameters
// the : is a placeholder for calling the parameter
app.get("/hello/:name", (req, res) => {
    let value = req.params.name;

    let message = "hello" + value;
    let msg2 = `hello ${value}`


    res.send(msg2)
})


// app.get("/bye", (req, res) => {
// res.send("see you later mike")
// })

app.get("/bye", (req, res) => {
    let value = req.query.name;
    if (value) {
        res.send(`See ya later ${value}`)
    }
    else {
        res.send("See ya later")
    }
})
// write a GET route definition that will do this:
// request a url contains /bye?name=mike --> "see ya later mike"
// request a url contains /bye?name=jill --> "see ya later jill"
// request url is just /bye             --> "see ya later"

// hint is you get the query parameter using: req.query.name





//another way to do this is in a request query
// this deals with the stuff after the question mark. 






app.listen(PORT, () => { console.log('Application is listening on port', PORT) })