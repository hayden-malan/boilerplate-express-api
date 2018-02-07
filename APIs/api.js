var request = require('superagent')

var baseURL = "https://eda-te-reo.herokuapp.com/api/proverbs"

// function getProverbs (baseURL) {
//   request
//     .get(baseURL)
//     .end((err, res) => {
//       callback(err, res.body)
//     })
//   }

function getProverbs (baseURL) {
    request
      .get(baseURL)
      .then(result => {
        console.log(result.body.source)
      })
      .catch(err => {
        console.log(error)
      })
}

// function get Proverbs (baseURL)


module.exports = {
    getProverbs
}
