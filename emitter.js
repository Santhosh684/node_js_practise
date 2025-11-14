const fs = require("fs").promises;
const emitterEvent = require("events");
const path = require("path");

const caller = new emitterEvent();
const logFile = path.join(__dirname , "logs" , "events.log");

function getId(max , min){

    let x, y;
    x = Math.ceil(min);
    y = Math.floor(max);

    return Math.floor(Math.random() * (y - x)) + x;
}


caller.on("user-added" , async (user) =>{

    console.log("Request to add user with id " + user.id)

    const content = "User added :" + JSON.stringify(user) + " " + new Date().toISOString() + "\n";
    
    await fs.mkdir(path.dirname(logFile), {recursive : true});

    await fs.appendFile(logFile , content);

    console.log("User with id " + user.id + " has been added");

})

let i = 0;

while(i < 5){

    id = i;
    const  val = {
        "id" :  id ,
        "name" :  `user${id}`
    }

    console.log(val);
    caller.emit("user-added" , val);
    // Removed: Emitting "user-added" with a string instead of a user object would cause errors in the event handler.
    i++;
}


