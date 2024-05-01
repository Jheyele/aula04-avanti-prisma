import jwt from "jsonwebtoken";


export default function (request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json("Token missing!");
    }
  
    const token = authorization.replace('Bearer ', '').trim();

    try {
        const { clientId } = jwt.verify(token, process.env.SECRET_KEY_JWT);
  
        if (!clientId){
            return response.status(401).json("Unauthorized");
        }
        
        return next();
    } catch (error){
        return response.status(401).json("Invalid Token");
    }

}