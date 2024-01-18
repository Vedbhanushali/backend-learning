const _ = require('lodash')

const arr = [1, 3, 5, 6, 6, 6, 6, "sd", "test", 5.6]

//loadash example for filtering unique elements
const filtered = _.uniq(arr)
console.log(filtered)