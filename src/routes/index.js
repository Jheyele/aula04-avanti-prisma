import { Router } from "express";
import { ClientController } from "../controllers/ClientController.js";
import { OrderController } from "../controllers/OrderController.js";

const routes = Router();
const clientController = new ClientController();
const orderController = new OrderController();

// client
routes.get("/clients", clientController.findAllClients);
routes.get("/client/:id/orders", clientController.findClientAndOrders);
routes.post("/client", clientController.createClient);
routes.put("/client/:id", clientController.updateClient);
routes.delete("/client/:id", clientController.deleteClient);

// order
routes.get("/orders", orderController.findAllOrders);
routes.get("/order/:orderId", orderController.findOrderIdWithClient);
routes.post("/order", orderController.createOrder);
routes.put("/order/:id", orderController.updateOrder);
routes.delete("/order/:id", orderController.deleteOrder);

export { routes }