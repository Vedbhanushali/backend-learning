var fs = require('fs')
var os = require('os')

var user = os.userInfo();
console.log(user)

fs.appendFile('greeting.txt', `hello ${user.username} \n`, () => {
    console.log("file is created")
})