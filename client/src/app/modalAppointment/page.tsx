import ModalAppointment from "@/components/ui/modalAppointment";

export default function TestModalAppointment() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <ModalAppointment 
                text1 = "Tipo de consulta"
                text2 = "Médico Responsável"
                text3 = "Data do atendimento"
                text4 = "Horário do atendimento"
            />
        </div>
    );
}