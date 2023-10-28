const jwt = require("jsonwebtoken");
const jwtKey = process.env.jwtKey;

module.exports.verifyToken = function(req, res, next){
    let token = req.headers['authorization']
    if(token){
        jwt.verify(token, jwtKey, (err,valid) => {
            if(err){
                res.status(500).json({ message: 'Server error' });
            }            
             next();
        })
    }
}