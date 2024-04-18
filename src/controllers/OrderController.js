import { prismaClient } from "../database/PrismaClient.js";

export class OrderController {

    async findAllOrders (request, response) {
        try {
            const orders = await prismaClient.order.findMany();
            return response.status(200).json(orders)
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }

    async createOrder (request, response) {
        const { description, price, clientId } = request.body;
        try {
            const order = await prismaClient.order.create({
                data: {
                    description: description,
                    price: price,
                    client_id: clientId
                }
            });
            return response.status(201).json(order);
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }

    async updateOrder (request, response) {
        const { description, price, clientId } = request.body;
        const { id } = request.params;

        try {
            const order = await prismaClient.order.update({
                where: {
                    id
                },
                data: {
                    description,
                    price,
                    client_id: clientId
                }
            })
            return response.status(200).json(order);
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }        
     }

    async deleteOrder (request, response) {
        const { id } = request.params;
        
        await prismaClient.order.delete({
            where: { id }
        })

        return response.status(204).send();
    }

    async findOrderIdWithClient (request, response) {
        const { orderId } = request.params;
        try {
            const orders =  await prismaClient.order.findUnique({
                where: {
                  id: orderId,
                },
                include: {
                  client: true,
                },
              });

            return response.status(200).json(orders);
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }   
    }

}