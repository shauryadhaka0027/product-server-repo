import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const auth=async (req, res, next) => {
    try {
        const token =req.cookies["token"]
        const refreshToken = req.cookies["refreshToken"]
        // console.log(token)
        if(!token) {
            return res.status(401).json({message:"Token is required"})
        }
        if(token){
          jwt.verify(token,process.env.TOKEN_Key,async(err,decode)=>{
            if(err){
            jwt.verify(refreshToken,process.env.TOKEN_Key,async(err,decode)=>{
                if(err){
                    return res.status(401).json({message:"Refresh Token is expired"})

                }
                req.userId=decode?.id
                next()

            })
            }
            req.userId=decode?.id
            
            next()
          })

        }
    } catch (error) {
        res.status(500).json({message:"error in auth middleware"})
    }
}