import jwt from 'jsonwebtoken'

export const authUser = (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
          return res.status(401).json({message:'user not autherised',sucess: false}) 
        }
        
        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!tokenVerified){
            return res.status(401).json({message:'user not autherised',sucess: false}) 
        }
        
        req.user=tokenVerified
        
        next()
        
    } catch (error) {
        
        return res.status(401).json({message:'user autherization failed',sucess: false}) 
    }
}