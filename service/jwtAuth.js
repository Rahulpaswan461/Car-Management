const JWT = require("jsonwebtoken")
const secret = "rahul@123"

function createTokenForAuthenticateUser(user){
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    return JWT.sign(payload,secret)
}

function verifyToken(token){
    return JWT.verify(token,secret)
}

module.exports = {
    createTokenForAuthenticateUser,
    verifyToken
}