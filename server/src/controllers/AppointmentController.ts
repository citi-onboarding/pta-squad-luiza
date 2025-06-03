import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class AppointmentController implements Crud {
  constructor(private readonly citi = new Citi("Consulta")) {}
  create = async (request: Request, response: Response) => {
    const { dataHora, tipo, descricao, nomeVeterinario, pacienteId } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      dataHora,
      tipo,
      descricao,
      nomeVeterinario,
      pacienteId,
    );
    if (isAnyUndefined) return response.status(400).send();

    const newAppointment = { dataHora, tipo, descricao, nomeVeterinario, pacienteId };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newAppointment);

    return response.status(httpStatus).send({ message });
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
    const { dataHora, tipo, descricao, nomeVeterinario, pacienteId } = request.body;

    const updatedValues = { dataHora, tipo, descricao, nomeVeterinario, pacienteId };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new AppointmentController();
