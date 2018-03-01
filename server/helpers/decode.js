const jwt = require('jsonwebtoken')
const getDecode = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secure', function(err, decoded) {
      if(!err) {
        resolve(decoded)
      } else {
        reject(err);
      }
    })
  })
}

module.exports = getDecode
