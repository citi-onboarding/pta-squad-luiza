import express from "express";
import userController from "./controllers/UserController";
import patientController from "./controllers/PatientController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

// Patient routes
routes.post("/pacientes", patientController.create);
routes.get("/pacientes", patientController.get);
routes.get("/pacientes/:id", patientController.getById);
routes.delete("/pacientes/:id", patientController.delete);
routes.patch("/pacientes/:id", patientController.update);

export default routes;
