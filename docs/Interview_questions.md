# Interview questions

## what do you mean by I/O?

INPUT/OUTPUT

## Can we run Node.js on windows

yes

## what is node red

Node red is visually diagram tool used for IOT and hardware connection simulation.

## node runs on which file type

.js

## How is operational error different from programming error ?

programming error made by missing testcase written by programmer where code is breaking
operational error are like network error or server down due to max load reached.

## What is blocking code ?

if execution of synchronous functions are like f1 -> f2 -> f3 then if by chance there is error in f2 function then it will block the execution of f3 function.

## what is setTimeout function ?

setTimeout is an asynchronous function which is used to execute some code after a particular time

## How javascript different than node.js ?

JavaScript is a language that is used for client-side web development Node.js is a runtime environment that allows the execution of JavaScript code on the server side.

## Node js is single threaded or multi threaded ?

Node.js is single threaded application but it handles multiple tasks using asynchrnous call stack and event loop.

## How to find IP address of user from node.js ?

const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; console.log('address:', ip);

## How to install the Node body-parser module?

npm i body-parser

## What is the call-back function used for?

after main function is executed callback function is called later , so this function is passed in main function.

## what is use of nodemon ?

nodemon keep monitoring file changes and if any redeploy/restart the server file.
