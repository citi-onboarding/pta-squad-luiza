import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import { pacienteSchema, pacienteUpdateSchema } from "../validation/patientValidation";

class PatientController implements Crud {
    constructor(private readonly citi = new Citi("Paciente")) {}
    create = async (request: Request, response: Response) => {
        const parseResult = pacienteSchema.safeParse(request.body);
        if (!parseResult.success) {
            return response.status(400).json({ errors: parseResult.error.errors });
        }
        const { nome, nomeTutor, idade, especie } = parseResult.data;

        const newPatient = { nome, nomeTutor, idade, especie };
        const { httpStatus, message } = await this.citi.insertIntoDatabase(newPatient);

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
            return response.status(httpStatus).send({ message: "Patient not found" });
        }

        return response.status(httpStatus).send(value);
    };

    delete = async (request: Request, response: Response) => {
        const { id } = request.params;

        const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

        return response.status(httpStatus).send({ messageFromDelete });
    };

    update = async (request: Request, response: Response) => {
        const { id } = request.params;
        const parseResult = pacienteUpdateSchema.safeParse(request.body);
        if (!parseResult.success) {
            return response.status(400).json({ errors: parseResult.error.errors });
        }
        const updatedValues = parseResult.data;

        const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
            id,
            updatedValues
        );

        return response.status(httpStatus).send({ messageFromUpdate });
    };
}

export default new PatientController();