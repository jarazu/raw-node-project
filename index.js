const http = require('http');
const url = require('url');

// app object - module scaffolding
const app = {};

//configuraiton
app.config = {
    port: 3000
};

//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to port ${app.config.port}`);
    });
}

app.handleReqRes = (req, res) => {
    //request handle
    //get the url and parse it
    debugger
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    console.log(path); 
    console.log('trimmedPath', trimmedPath); 
    //response handle
    res.end('Hello world 2'); //
}

app.createServer();