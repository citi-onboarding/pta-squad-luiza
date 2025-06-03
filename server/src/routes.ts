import express from "express";
import userController from "./controllers/UserController";
import AppointmentController from "./controllers/AppointmentController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/consultas", AppointmentController.create);
routes.get("/consultas", AppointmentController.get);
routes.get("/consultas/:id", AppointmentController.getById);
routes.delete("/consultas/:id", AppointmentController.delete);
routes.put("/consultas/:id", AppointmentController.update);
routes.get("/consultas/:nomeVeterinario", AppointmentController.filterByVeterinario);

export default routes;
