let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*"; // all kind of clients are allowed to make the request
appConfig.env = "dev";
appConfig.db = {
  // connection string
  uri: "mongodb://127.0.0.1:27017/EdwisorApiDatabase" // since mongodb is on localhost that's why 127 part and then db name
};
appConfig.apiversion = "/api/v1"; // for keeping track of version of APIs  

// module.exports is an object, that is returned by current module whenever it is required by some other module.
module.exports = {
  port: appConfig.port,
  allowedCorsOrigin: appConfig.allowedCorsOrigin,
  environment: appConfig.env,
  db: appConfig.db,
  apiVersion: appConfig.apiversion
}; // end of exports
