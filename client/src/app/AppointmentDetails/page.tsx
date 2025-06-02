"use client";
import React from "react";
import "@/styles/fonts.css";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { CardHistory } from "@/components/ui/cardHistory";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ModalAppointment } from "@/components/ui/modalAppointment";

function getAppointmentBg(type?: string) {
    switch (type) {
        case "vaccine":
            return "bg-[rgba(170,225,255,1)]";
        case "checkup":
            return "bg-[rgba(156,255,149,1)]";
        case "return":
            return "bg-[rgba(255,100,5,0.6)]";
        case "first":
            return "bg-[rgba(191,181,255,1)]";
        default:
            return "bg-gray-200";
    }
}

export default function AppointmentDetails() {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    
    const handleBackClick = () => { router.back(); }
    
    const history = [
    { id: 1, date: "18/02", time: "13:00", doctorName: "Dr. José Carlos", appointmentType: "vaccine"},
    { id: 2, date: "19/02", time: "14:00", doctorName: "Dr. João Alves", appointmentType: "checkup" },
    { id: 3, date: "20/02", time: "15:00", doctorName: "Dr. João Alves", appointmentType: "vaccine" },
    { id: 4, date: "21/02", time: "16:00", doctorName: "Dr. José Carlos", appointmentType: "return" },
    ];

    const [selectedId, setSelectedId] = useState(history[0].id);

    const selected = history.find(item => item.id === selectedId);

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
                    
                    <div className="flex flex-row items-center gap-4 pt-[48px] pb-8">
                        <button onClick={handleBackClick}>
                            <Image src="/img/arrow_back_ios_new.svg" alt="arrow-back" width={16} height={27}/>
                        </button>
                        
                        <h1 className="text-[48px] font-sourcecode font-[700]">Detalhes da Consulta</h1>
                    </div>

                    
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-x-12">
                        <div className="flex flex-col max-w-[700px] flex-1">
                            <p className="font-neuehaasgrotesk text-[24px] font-[700] pt-2 pb-8">Paciente</p>
                            <div className="flex flex-col lg:flex-row gap-[45px] items-center pb-4">
                                <Image src='/img/cat-image.svg' alt="cat" width={295} height={299} className="w-[295px] h-[299px]"/>
                                <div className="flex flex-col lg:flex-col justify-between">
                                    <div className="flex flex-col font-neuehaasgrotesk text-[24px] pt-[80px] gap-3">
                                        <p className="font-[700]">Luna</p>
                                        <p className="font-[400]">5 anos</p>
                                    </div>
                                    
                                    <div className="flex flex-col pt-[126px] gap-3">
                                        <p>Lucas Gomes</p>
                                        <p>{selected?.doctorName}</p>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="flex flex-col items-start py-8 gap-6">
                                <div className="w-full max-w-[631px] flex flex-col items-start gap-3">
                                    <p className="font-sfpro font-[700]">Descrição do problema:</p>
                                    <p className="font-sfpro self-stretch leading-[17.6px]">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                                    </p>
                                </div>
                                
                                <div className="inline-flex items-center gap-6 py-2">
                                    <p className="font-[700] whitespace-nowrap">Tipo de consulta:</p>
                                    <p className={`font-[400] w-[101px] h-[30px] p-[6px] flex justify-center items-center rounded-[4px] whitespace-nowrap ${getAppointmentBg(selected?.appointmentType)}`} >
                                        {selected?.appointmentType === "vaccine" && "Vacinação"}
                                        {selected?.appointmentType === "checkup" && "Check-up"}
                                        {selected?.appointmentType === "return" && "Retorno"}
                                        {selected?.appointmentType === "first" && "Primeira Consulta"}
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
                    
                        <div className="flex flex-col items-start min-w-[558px] max-w-[558px] pt-2">
                            <p className="font-neuehaasgrotesk text-[24px] font-[700] mb-4">Histórico de Consultas</p>
                            <div className="w-full h-[448px] flex flex-col justify-around items-center py-3 bg-white border border-[rgba(217,217,217,1)] rounded-[24px]">
                                {history.map((item) => (
                                    <CardHistory key={item.id} date={item.date} time={item.time} doctorName={item.doctorName} appointmentType={item.appointmentType} onClick={() => setSelectedId(item.id)}/>
                                ))}       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}