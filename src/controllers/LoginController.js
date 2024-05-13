import jwt from "jsonwebtoken";
import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs"

export class LoginController {

    async sign(request, response){
        const { email, password } = request.body;
        try {
            const client = await prismaClient.client.findFirst({
                where: {
                    email: email
                }
            });
    
            if (!client) {
                return response.status(401).json({"message": "Client Unauthorized"});
            }
    
            const verifyPass = bcrypt.compareSync(password, client.password);

            if (!verifyPass) {
                return response.status(401).json({"message": "Client Unauthorized"});
            }
    
            const token =  jwt.sign({clientId: client.id, isAdmin: client.isAdmin}, process.env.SECRET_KEY_JWT, { expiresIn: '2h' });

            return response.status(200).json({"id": client.id, "name": client.name, "token": token})
        } catch (error) {
            return response.status(500).json({"message": "Server error"})
        }
              
    }
}