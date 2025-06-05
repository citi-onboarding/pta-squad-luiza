import express from "express";
import userController from "./controllers/UserController";
import AppointmentController from "./controllers/AppointmentController";
import patientController from "./controllers/PatientController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

// Appointment routes
routes.post("/consultas", AppointmentController.create);
routes.get("/consultas", AppointmentController.get);
routes.get("/consultas/:id", AppointmentController.getById);
routes.delete("/consultas/:id", AppointmentController.delete);
routes.put("/consultas/:id", AppointmentController.update);
routes.get("/consultas/:nomeVeterinario", AppointmentController.filterByVeterinario);

// Patient routes
routes.post("/pacientes", patientController.create);
routes.get("/pacientes", patientController.get);
routes.get("/pacientes/:id", patientController.getById);
routes.delete("/pacientes/:id", patientController.delete);
routes.patch("/pacientes/:id", patientController.update);

export default routes;
