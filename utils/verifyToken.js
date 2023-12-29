import jwt from "jsonwebtoken";

import { createError } from "./error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return next(createError(401, "you are not authenticated!"));
    }

     jwt.verify(token, process.env.JWT, (err, userInfo)=>{
        if(err)   return next(createError(402, "Invalid token"));

        req.anything = userInfo;//here user can be any words
        
        next();//this function call the next funcion or middleware if function is absent
    });
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.anything.id === req.params.id || req.anything.isAdmin) {
            next();
        } else {
            return next(createError(403, "you are not authorised"));
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.anything.isAdmin) {
            next();
        } else {
            return next(createError(403, "you are not authorised as admin"));
        }
    })
}



