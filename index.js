//pull in db
const mongodb = require("./persist/mongo");
//pull in server/app
const app = require("./server");

//initiate command line flags
const flags = require('flags');
flags.defineNumber("port", 3000, "Ports for http server");
flags.parse();
// initiate env variables
const dotenv = require('dotenv');
dotenv.config();
// set up port # catch-all
const port = flags.get("port") || process.env.PORT || 4000;

//set up and connect to server
mongodb.onConnect(()=>{
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
});
mongodb.connect(process.env.USERNAME, process.env.PASSWORD);