import { Router } from "express";
import { ClientController } from "../controllers/ClientController.js";
import { OrderController } from "../controllers/OrderController.js";
import { LoginController } from "../controllers/LoginController.js";

const routes = Router();
const clientController = new ClientController();
const orderController = new OrderController();
const loginController = new LoginController();

// client
routes.get("/clients", clientController.findAllClients);
routes.get("/client/:id", clientController.findClientAndOrders);
routes.post("/client", clientController.createClient);
routes.put("/client/:id", clientController.updateClient);
routes.delete("/client/:id", clientController.deleteClient);

// order
routes.get("/orders", orderController.findAllOrders);
routes.get("/order/:orderId", orderController.findOrderIdWithClient);
routes.post("/order", orderController.createOrder);
routes.put("/order/:id", orderController.updateOrder);
routes.delete("/order/:id", orderController.deleteOrder);

//login
routes.post("/login", loginController.sign);

export { routes }