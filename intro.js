const e = require("express");

function getSytstemInfo() {

    return new Promise((resolve, reject) => {   

        try{
            const systemInfo = {
                platform: process.platform,
                version: process.version,
                pid: process.pid
            };
            
            const file_info ={
                filename : __filename,
                dirname : __dirname
            }

            if(systemInfo && file_info){
                console.log("Fetching system info...");
                    setTimeout(() => {
                    resolve(systemInfo , file_info);
                }, 2000);
            }
            else{
                console.log("Error: No system info found");
                reject("No system info found");
            }
        }
        catch(err){
            throw new Error(err.message);
        };
    })
}

getSytstemInfo()
    .then(info => console.log(info))
    .catch(err => console.log(err));