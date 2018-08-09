// These 2 middlewares are must in each application 

// whenever some error occurs, this will be called
let errorHandler = (err, req, res, next) => {
    console.log('appErrorHandler middleware called' + err);
    res.send('Some error occured at global level')
    
} // end request ip logger function

// whenever the route is not founds, this will be called
let notFoundHandler = (req, res, next) => {
    console.log("Global notFoundHandler called");
    res.status(400).send('Route not found in the Application')
}// end not found handler

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
}