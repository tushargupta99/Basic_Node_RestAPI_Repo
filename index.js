const express = require ('express');
const mongoose = require ('mongoose');
const http = require('http');
const appConfig = require ('./config/appConfig');
const fs = require("fs");
const bodyParser = require ('body-parser');
const logger = require ('./response_format_library/logger_library.js');
const cookieParser = require ('cookie-parser');
const globalErrorMiddleware = require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require("./middlewares/routeLogger");
//wearing Helmet
var helmet = require('helmet')

const app = express();
app.use(helmet());

//using  middle wares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
//third party middleware
app.use(cookieParser());
// application level
app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)


// Bootstrap/Import all the Schemas in the models
let modelsPath = './models/';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')){
        require(modelsPath + file); // putting the fille in the "require" statement
    }    
});


// Bootstrap/Import all the files in the routes folder
let routesPath = './routes/';
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')){
        let routes = require(routesPath + file);  // putting the file in the "require" statement(storing it in a variable because we have to call setRouter function over that variable)
        routes.setRouter(app);
    }    
});
// globalNotFoundHandler(404 handler) middleware
app.use(globalErrorMiddleware.globalNotFoundHandler);


// creating http server instead of running server through app
const server = http.createServer(app)
// start listening to the http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error',onError)
server.on("listening", onListening);
// end listening to the server


// Event listener for HTTP server 'error' event
function onError(error) {
  if (error.syscall !== "listen") {
    logger.captureError(
      error.code + " not equal listen",
      "serverOnErrorHandler",
      10
    );
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.captureError(
        error.code + ":elavated privileges required",
        "serverOnErrorHandler",
        10
      );
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.captureError(
        error.code + ":port is already in use.",
        "serverOnErrorHandler",
        10
      );
      process.exit(1);
      break;
    default:
      logger.captureError(
        error.code + ":some unknown error occured",
        "serverOnErrorHandler",
        10
      );
      throw error;
  }
}


// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  "Listening on " + bind;
  logger.captureInfo(
    "server listening on port" + addr.port,
    "serverOnListeningHandler",
    10
  );
  let db = mongoose.connect(
    appConfig.db.uri,
    { useNewUrlParser: true }
  );
}

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});


//handeling mongooseconnection error
mongoose.connection.on('error', (err) => {
    console.log('Database connection error, Something Really Shitty happened ' + err);
})

//handeling mongooseconnection open
mongoose.connection.on('open', (err) => {
    if(err) {
        console.log("Shit Happens " + err);
    }else {
      console.log('Hurrey! Sucessful connection made');
    } 
})