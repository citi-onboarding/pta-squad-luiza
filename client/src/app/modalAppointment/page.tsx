import { ModalAppointment } from "@/components/ui/modalAppointment";

export default function TestModalAppointment() {
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-10 flex items-center justify-center">
            <ModalAppointment 
                text1 = "Tipo de consulta"
                text2 = "Médico Responsável"
                text3 = "Data do atendimento"
                text4 = "Horário do atendimento"
                isOpen={true}    
            />
        </div>
    );
}