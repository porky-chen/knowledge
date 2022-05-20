const fs = require("fs");



const datawriter = function(data,filename){
  fs.writeFile(filename, data, function(err) {
    if (err) {
        throw err;
    }
 
    console.log('file write success');
 

  });
}

module.exports = datawriter