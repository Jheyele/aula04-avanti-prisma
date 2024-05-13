import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs"

export class ClientController {
 
    async findAllClients (request, response) {
         // Method to fetch all clients or a specific client by ID
        const { clientId } = request.query;

        try {
            const clients = clientId
            ? await prismaClient.client.findUnique({
                where: { id: clientId }
            })
            : await prismaClient.client.findMany();
        
        if (!clients) {
            return response.status(404).json({ message: 'Client not found' });
        }
        
        return response.status(200).json(clients);
        } catch (error) {
            return response.status(500).send();
        }
    }

    async createClient (request, response) {
        const { name, email, phone, isAdmin, password } = request.body;
        try {
            const clientCheck = await prismaClient.client.findFirst({
                where:{
                    email: email
                }
            });

            if (clientCheck) {
                return response.status(409).json("E-mail already registered");
            }

           const passwordHash = bcrypt.hashSync(password, 10);

            const client = await prismaClient.client.create({
                data: {
                    name,
                    email,
                    phone,
                    isAdmin,
                    password: passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    isAdmin: true
                }
            });
            return response.status(201).json(client);
        } catch (error) {
            return response.status(500).send();
        }
    }

    async updateClient (request, response) {
        const { name, email, phone, isAdmin, password} = request.body;
        const { id } = request.params;

        try {

            const passwordHash = bcrypt.hashSync(password, 10);
            const client = await prismaClient.client.update({
                where: {
                    id
                },
                data: {
                    name,
                    email,
                    phone,
                    isAdmin,
                    password: passwordHash
                }
            })
            return response.status(200).json(client);
        } catch (error) {
            return response.status(500).send();
        }
     }

    async deleteClient (request, response) {
        const { id } = request.params;
        
        await prismaClient.client.delete({
            where: { id }
        })

        return response.status(204).send();
    }


    async findClientAndOrders (request, response) {
        const { id } = request.params;
    
        try {
            const client = await prismaClient.client.findUnique({
                where: {
                    id: id
                },
                include: {
                    order:{
                        select: {
                            id: true,
                            description: true,
                            price: true
                            // Add other fields you want to include from the order
                        },
                        orderBy: { price: 'asc'}
                    }
                }
            });
            
            if (!client) {
                return response.status(404).json({ message: "Client not found" });
            }
            
            return response.status(200).json(client);
        } catch (error) {
            return response.status(500).json({ message: "Internal server error" });
        }
    }

}