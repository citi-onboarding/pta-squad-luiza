"use client";
import "@/styles/fonts.css";
import { Button, Header, CardHistory } from "@/components/ui";
import Image from "next/image";
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { ModalAppointment } from "@/components/ui/modalAppointment";
import { format } from "date-fns";
import { Appointment, getAppointments } from "@/services/Appointments";
import { Patient, getPatientById } from "@/services/Patients";


function getAppointmentBg(tipo?: string) {
    switch (tipo) {
        case "VACINA":
            return "bg-[rgba(170,225,255,1)]";
        case "AVALIACAO":
            return "bg-[rgba(156,255,149,1)]";
        case "RETORNO":
            return "bg-[rgba(255,100,5,0.6)]";
        case "PRIMEIRA":
            return "bg-[rgba(191,181,255,1)]";
        default:
            return "bg-gray-200";
    }
}

function getPatientImage(especie?: string) {
    switch (especie) {
        case "GATO":
            return "/img/cat-image.svg";
        case "CACHORRO":
            return "/img/dog.svg";
        case "VACA":
            return "/img/giraffe.svg";
        case "OVELHA":
            return "/img/sheep.svg";
        case "CAVALO":
            return "/img/horse.svg";
        case "PORCO":
            return "/img/pig.svg";
        default:
            return "/img/cat-image.svg";
    }
}

export default function AppointmentDetails() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [patient, setPatient] = useState<Patient>();
    const handleBackClick = () => { router.back(); }
    const [history, setHistory] = useState<Appointment[]>([]);
    const { patientId, appointmentId } = useParams();
    useEffect(() => {
        async function fetchHistory() {
            try {
                const data = await getAppointments();
                setHistory(data);
            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
            }
        }

        async function fetchPatientById() {
            try {
                const data = await getPatientById(Number(patientId));
                setPatient(data);
            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
            }
        }
        fetchHistory();
        fetchPatientById();
    }, []);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selected = history.find(item => item.id === selectedId);
    const consultas = history.filter(appointment => appointment.pacienteId === patient?.id);
    

    return (
        <>
            <Header 
                    text1="Atendimento"
                    text2="Cadastro"
                    text3="made with"
                    text4="and </> by"
            />
            <div className="flex lg:pt-[7%] pt-[18%] flex-col max-h-screen bg-white font-sfpro text-base font-normal">  

                <div className="w-full max-w-[1440px] h-auto mx-auto px-8">
                    
                    <div className="flex flex-row lg:items-center items-baseline gap-4 pt-[48px] pb-8">
                        <button onClick={handleBackClick}>
                            <Image src="/img/arrow_back_ios_new.svg" alt="arrow-back" width={16} height={27}/>
                        </button>
                        
                        <h1 className="text-[48px] font-sourcecode font-[700] leading-[46px]">Detalhes da Consulta</h1>
                    </div>

                    
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-x-12">
                        <div className="flex flex-col max-w-[700px] flex-1">
                            <p className="font-neuehaasgrotesk text-[24px] font-[700] pt-2 pb-8">Paciente</p>
                            <div className="flex flex-col lg:flex-row gap-[45px] items-center pb-4">
                                <Image
                                    src={getPatientImage(patient?.especie)}
                                    alt="patient"
                                    width={295}
                                    height={299}
                                    className="w-[295px] h-[299px] lg:w-[295px] lg:h-[299px]"
                                />
        
                                <div className="flex flex-col lg:flex-col justify-between">
                                    <div className="flex flex-col font-neuehaasgrotesk text-[24px] pt-[80px] gap-3">
                                        <p className="font-[700]">{patient?.nome}</p>
                                        <p className="font-[400]">{patient?.idade} anos</p>
                                    </div>
                                    
                                    <div className="flex flex-col pt-[126px] gap-3">
                                        <p>{patient?.nomeTutor}</p>
                                        <p>{selected?.nomeVeterinario}</p>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="flex flex-col items-start py-8 gap-6">
                                <div className="w-full max-w-[631px] flex flex-col items-start gap-3">
                                    <p className="font-sfpro font-[700]">Descrição do problema:</p>
                                    <p className="font-sfpro self-stretch leading-[17.6px]">
                                        {selected?.descricao}
                                    </p>
                                </div>
                                
                                <div className="inline-flex items-center gap-6 py-2">
                                    <p className="font-[700] whitespace-nowrap">Tipo de consulta:</p>
                                    <p className={`font-[400] w-full h-[30px] p-[6px] flex justify-center items-center rounded-[4px] whitespace-nowrap ${getAppointmentBg(selected?.tipo)}`} >
                                        {selected?.tipo === "VACINA" && "Vacinação"}
                                        {selected?.tipo === "AVALIACAO" && "Check-up"}
                                        {selected?.tipo === "RETORNO" && "Retorno"}
                                        {selected?.tipo === "PRIMEIRA" && "Primeira Consulta"}
                                    </p>
                                </div>
    
                                <div className="w-full max-w-[624px] flex flex-col p-6 gap-6 items-center bg-white border border-[rgba(217,217,217,1)] rounded-[24px]">
                                    <span className="font-[700] text-center w-full">Deseja realizar outra consulta?</span>
                                    <Button onClick={handleClick} className="w-full max-w-[576px] h-[48px] flex flex-row gap-2 justify-center items-center">
                                        <Image src='/img/check-circle.svg' alt="check-circle" width={24} height={24}/>
                                        <span>Agendamento</span>
                                    </Button>
                                    <ModalAppointment text1='Tipo de consulta' text2='Médico Responsável' text3='Data do atendimento' text4='Horário do atendimento' isOpen={isModalOpen} onClose={handleCloseModal} />
                                </div>
                            </div>
                        </div>
                    
                        <div className="flex flex-col items-start lg:min-w-[558px] lg:max-w-[558px] w-full pt-2">
                            <p className="font-neuehaasgrotesk text-[24px] font-[700] mb-4">Histórico de Consultas</p>
                            <div className="w-full h-full gap-6 p-6 flex flex-col justify-around items-center  bg-white border border-[rgba(217,217,217,1)] rounded-[24px]">
                                {consultas?.map((item) => {

                                    const dateObj = new Date(item.dataHora);
                                    const dateObjPlus3 = new Date(dateObj.getTime() + 3 * 60 * 60 * 1000);
                                    return (
                                        <CardHistory
                                            key={item.id}
                                            date={format(dateObjPlus3, "dd/MM")}
                                            time={format(dateObjPlus3, "HH:mm")}
                                            doctorName={item.nomeVeterinario}
                                            appointmentType={item.tipo}
                                            onClick={() => setSelectedId(item.id)}
                                        />
                                    )})}       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}