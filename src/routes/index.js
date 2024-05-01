import { Router } from "express";
import { ClientController } from "../controllers/ClientController.js";
import { OrderController } from "../controllers/OrderController.js";
import { LoginController } from "../controllers/LoginController.js";
import authenticate from "../auth/authenticate.js";
import authorization from "../auth/authorization.js";

const routes = Router();
const clientController = new ClientController();
const orderController = new OrderController();
const loginController = new LoginController();

// client
routes.get("/clients", authenticate, clientController.findAllClients);
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

//login
routes.post("/login", loginController.sign);

export { routes }