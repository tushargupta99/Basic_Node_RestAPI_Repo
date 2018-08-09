// so that values that U are storing do not contain any unnecessary spaces
let trim = (x) => {
   let value = String(x)
   return value.replace(/^\s+|\+$/gm , '')
}

let isEmpty = (value) => {
    if(value === null || value == undefined || trim(value) === '' || value.length === 0 ) {
        return true;
    }else {
        return false
    }
}
module.exports = {
    isEmpty : isEmpty
}