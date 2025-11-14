// trying to write a textfile using fs module

const fs = require('fs').promises;
const path = require('path');

const filepath = path.join(__dirname, "logs", "activity.txt");
const filepath2 = path.join(__dirname, "data", "user.json");

// micro task

function getId(max , min){

    let x, y;
    x = Math.ceil(min);
    y = Math.floor(max);

    return Math.floor(Math.random() * (y - x)) + x;
}

// Task: write to a file

async function writeFile(){

    try{

        const writeData = "\n\nUser accessed the system at " + new Date().toISOString() + "\n";
        await fs.appendFile(filepath , writeData);
        return"File written successfully";
    }
    catch(err){
        throw new Error(err.message);
    }    

}


// write to json and log it back into activity.txt

async function taskB(){

    try{
        let val = getId(10 , 1);
        const userData = { id: val , name: "User" + val };
        
        const raw = await fs.readFile( filepath2 , "utf-8");
        let users = JSON.parse(raw);


        users.push(userData);

        await fs.writeFile(filepath2 , JSON.stringify(users , null , 2));
        console.log("User data written successfully");    

        let data_read = await fs.readFile(filepath2 , "utf-8");
        let time_stamp = new Date().toISOString() + " - User data logged : ";

        data_read = time_stamp + data_read + "\n";

        await fs.appendFile(filepath , data_read );
        console.log("User data logged successfully");
    }
    catch(err){
        console.error("Error: " + err.message);
    }
}

let x = getId(100 ,1);
if(x % 2 == 0){
    console.log("Task B Selected");
    b= taskB();
    b.then((message) => console.log("Done with Task B"))
    b.catch((error) => console.error(error));
}
else{
    console.log("Write File Task Selected");
    write= writeFile();
    write.then((message) => console.log(message))
    write.catch((error) => console.error(error));
}




