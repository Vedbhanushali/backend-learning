const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    //first checking request header has authorization or not
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({
        error: 'Token Not found'
    })

    //extract jwt token from request
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({
        error: 'UnAuthorized'
    })

    try {
        //verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user = decoded
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Invalid token'
        })
    }
}

//Funtion to generate JWT token
const generateToken = (userData) => {
    //generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 })
}


module.exports = { jwtAuthMiddleware, generateToken }