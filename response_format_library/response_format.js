// standardizing the response returned from the api

let generate = (err, message, status, data) => {
    let response = {
        error : err,
        message :  message,
        status : status,
        data : data
    }
    return response;
}

module.exports = {
    generate : generate
}