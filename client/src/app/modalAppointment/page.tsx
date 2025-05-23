import ModalAppointment from "@/components/ui/modalAppointment";

export default function TestModalAppointment() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <ModalAppointment 
                text1 = "O pet já está cadastrado no sistema! Preencha os dados da consulta"
                text2 = "Tipo de consulta"
                text3 = "Médico Responsável"
                text4 = "Data do atendimento"
                text5 = "Horário do atendimento"
            />
        </div>
    );
}