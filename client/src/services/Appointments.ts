import api from "./api";

export interface Appointment {
    id: number;
    dataHora: string;
    tipo: string;
    descricao: string;
    nomeVeterinario: string;
    pacienteId: number;
}

export async function getAppointments() {
    const response = await api.get("/consultas");
    return response.data;
}

export async function getAppointmentById(id: number) {
    const response = await api.get(`/consultas/${id}`);
    return response.data;
}

export async function createAppointment(data: Omit<Appointment, 'id'>) {
    const response = await api.post("/consultas", data);
    return response.data;
}

export async function updateAppointment(id: number, data: Appointment) {
    const response = await api.put(`/consultas/${id}`, data);
    return response.data;
}

export async function deleteAppointment(id: number) {
    const response = await api.delete(`/consultas/${id}`);
    return response.data;
}