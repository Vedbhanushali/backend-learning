const lib = require('./export_me')
console.log('export successful in main file')

var age = lib.age
const result = lib.addNum(2, 4)
console.log(age, result)