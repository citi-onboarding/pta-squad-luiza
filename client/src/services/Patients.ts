import api from "./api";

export interface Patient {
    id: number;
    nome: string;
    nomeTutor: string;
    idaide: number;
    especie: string;
}

export async function getPatients() {
    const response = await api.get("/pacientes");
    return response.data;
}

export async function getPatientById(id: number) {
    const response = await api.get(`/pacientes/${id}`);
    return response.data;
}

export async function createPatient(data: Omit<Patient, 'id'>) {
    const response = await api.post("/pacientes", data);
    return response.data;
}

export async function updatePatient(id: number, data: Patient) {
    const response = await api.put(`/pacientes/${id}`, data);
    return response.data;
}

export async function deletePatient(id: number) {
    const response = await api.delete(`/pacientes/${id}`);
    return response.data;
}