const jwt = require('jsonwebtoken')

//Header: Authorization: Bearer {Token}

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.json({ 
        status: 401, 
        success: false ,
        message: 'access token not found' 
    })

    try {
        // check token is valid
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.phone
        next()
    } catch (error) {
        console.log('fail')
        res.status(403).json({success: false, message:'Invalid token'})
    }
    

}

module.exports = verifyToken