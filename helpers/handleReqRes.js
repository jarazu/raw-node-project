
const {StringDecoder} = require('string_decoder');
const url = require('url');
const routes = require('./routes');
const {notFoundHandlers} = require('./handlers/routesHandlers/notFoundHandlers');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    //request handle
    //get the url and parse it
    debugger 
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    // console.log(path); 
    // console.log('trimmedPath', trimmedPath); 
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headerObject = req.headers;
    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headers
    }

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath]? routes[trimmedPath]: notFoundHandlers;
    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);
        // return the final response
        res.writeHead(statusCode);
        res.end(payloadString);
    })
    req.on('data',(buffer) => {
        realData += decoder.write(buffer);
    })

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end('Hello world 2'); //
    })

}
module.exports = handler;