import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../../ENV";

export interface AuthRequest extends Request{
    user?:JwtPayload;
    token?:string;
};

const JWT_SECRETS = JWT_SECRET()|| "dafault_secret";

export const authMiddelware = (req: AuthRequest, res:Response, next:NextFunction)=>{
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        res.status(401).json({msg:"Acceso denegado", Status:false});
        return;
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRETS) as JwtPayload;
        req.token = token;
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({msg:"Token Invalido"});
        return;
    }
}