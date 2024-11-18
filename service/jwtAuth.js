const JWT = require("jsonwebtoken")

function createTokenForAuthenticateUser(user){
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    return JWT.sign(payload,process.env.SECRET,{expiresIn:'2h'})
}

function verifyToken(token){
    return JWT.verify(token,process.env.SECRET)
}

module.exports = {
    createTokenForAuthenticateUser,
    verifyToken
}