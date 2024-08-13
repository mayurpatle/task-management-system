const  jwt   =  require('jsonwebtoken')  ; 
const  User = require('../models/User') ;  

const  authMiddleware = async (req , res  )  => {
    
    // Get token from header
    const token = req.header('authorization')   ; 
        
    // Check if token is not undefined
    if(!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' }) ;  
    }
    try {
        // Verify token
        const decoded = jwt.verify(token.split('')[1], process.env.JWT_SECRET) ; 
        
        // Check if user exists
        const user = await User.findById(decoded.id) ; 
        
        if(!user) {
            return res.status(401).json({ msg: 'Token is not valid, authorization denied' }) ;  
        }

        // Add user from payload
        req.user = decoded.user;

        next() ; 

    }catch(err){
        console.error('Something wrong with auth middleware');
        res.status(401).json({ msg: 'Token is not valid' });
    }
};  


module.exports  =  authMiddleware  ;  
