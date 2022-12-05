const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5500;                  //Save the port number where your server will be listening


app.use( express.static( "/Users/yuxin/Documents/COMP353/COMP324/MusicPlayer" + '/client' ));
//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('/client/index.html', {root: "/Users/yuxin/Documents/COMP353/COMP324/MusicPlayer"});      //server responds by sending the index.html file to the client's browser
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

