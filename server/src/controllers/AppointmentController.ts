import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import { appointmentSchema } from "../validation/appointmentValidation";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

class AppointmentController implements Crud {
  constructor(private readonly citi = new Citi("Consulta")) {}
  create = async (request: Request, response: Response) => {
    try {
      const validatedData = appointmentSchema.parse(request.body);
      const { httpStatus, message } = await this.citi.insertIntoDatabase(validatedData as Prisma.ConsultaUncheckedCreateInput);
      return response.status(httpStatus).send({ message });
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ errors: error.errors });
      }
      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };

  getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { httpStatus, value } = await this.citi.findById(id);
    if (httpStatus === 404) {
      return response.status(httpStatus).send({ message: "Appointment not found" });
    }
    return response.status(httpStatus).send(value);
  };

  filterByVeterinario = async (request: Request, response: Response) => {
    const { nomeVeterinario } = request.query;
    if (!nomeVeterinario) {
      return response.status(400).send({ message: "nomeVeterinario is required" });
    }
    
    const { httpStatus, values } = await this.citi.findByField("nomeVeterinario", String(nomeVeterinario));

    return response.status(httpStatus).send(values);
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      const validatedData = appointmentSchema.parse(request.body);
      const { httpStatus, messageFromUpdate } = await this.citi.updateValue(id, validatedData as Prisma.ConsultaUncheckedCreateInput);
      return response.status(httpStatus).send({ messageFromUpdate });
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ errors: error.errors });
      }
      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  
}

export default new AppointmentController();
