"use client";

import { useState } from "react";
import { Header, Button, CardWeb, Input, DatePicker } from "@/components/ui";
import { ModalAppointment } from "@/components/ui/modalAppointment";
import Image from "next/image";

function parseDate(dateStr: string) {
  const [day, month] = dateStr.split("/").map(Number);
  return new Date(new Date().getFullYear(), month - 1, day);
}

// Card data array for easier filtering
const cardData = [
  {
    id: 1,
    date: "10/06",
    time: "09:00",
    petName: "Mimi",
    ownerName: "João Silva",
    doctorName: "Dr. Ana Souza",
    appointmentType: "first",
    appointmentStatus: false,
  },
  {
    id: 2,
    date: "11/06",
    time: "10:30",
    petName: "Mimi",
    ownerName: "João Silva",
    doctorName: "Dr. Gustavo Silva",
    appointmentType: "return",
    appointmentStatus: false,
  },
  {
    id: 3,
    date: "12/06",
    time: "14:00",
    petName: "Mimi",
    ownerName: "João Silva",
    doctorName: "Dra. Fernanda Lima",
    appointmentType: "checkup",
    appointmentStatus: false,
  },
  {
    id: 4,
    date: "13/06",
    time: "11:15",
    petName: "Mimi",
    ownerName: "João Silva",
    doctorName: "Dr. Lucas Almeida",
    appointmentType: "vaccine",
    appointmentStatus: false,
  },
  {
    id: 5,
    date: "15/06",
    time: "13:30",
    petName: "Mimi",
    ownerName: "João Silva",
    doctorName: "Dr. Gustavo Silva",
    appointmentType: "checkup",
    appointmentStatus: false,
  },
  {
    id: 6,
    date: "16/06",
    time: "15:45",
    petName: "Mimi",
    ownerName: "João Silva",
    doctorName: "Dra. Fernanda Lima",
    appointmentType: "vaccine",
    appointmentStatus: false,
  },
];

export default function ServicePage() {
    const [isHistory, setIsHistory] = useState(true);
    const [isSchedule, setIsSchedule] = useState(false);
    const [dateFrom, setDateFrom] = useState<Date | undefined>();
    const [dateTo, setDateTo] = useState<Date | undefined>();
    const [searchInput, setSearchInput] = useState(""); // for input field
    const [searchTerm, setSearchTerm] = useState("");   // for filtering
    const [showModal, setShowModal] = useState(false);

    const handleTabChange = (tab: string) => {
        setIsHistory(tab === 'history');
        setIsSchedule(tab === 'schedule');
    };

    const handleSearch = () => {
        setSearchTerm(searchInput.trim());
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredCards = cardData.filter(card => {
        const cardDate = parseDate(card.date);
        cardDate.setHours(0, 0, 0, 0);

        if (isHistory) {
            if (!(cardDate < today && card.appointmentStatus === true)) return false;
        }
        if (isSchedule) {
            if (!(cardDate >= today && card.appointmentStatus === false)) return false;
        }
        if (dateFrom && cardDate < dateFrom) return false;
        if (dateTo && cardDate > dateTo) return false;
        if (searchTerm && !card.doctorName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="flex flex-col items-center w-full h-full bg-white">
            <Header text1="Agendamento" text2="Cadastro" text3="made with" text4="and </> by" />
            <div className="flex flex-col items-center w-full h-auto pt-40 pb-32 px-24 gap-10 lg:px-48">
                <nav className="flex flex-col w-full gap-8">
                    <p className="font-sourcecode font-bold text-5xl text-black">Atendimento</p>
                    <div className="flex flex-col h-auto gap-6">
                        <p className="font-sfpro font-normal text-2xl text-black">Qual é o médico?</p>
                        <search className="flex items-center h-auto gap-6">
                            <Input 
                                id="doctorName"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                                placeholder="Pesquise aqui..."
                                className="w-[520px] h-[50px] border-[#101010] p-4 placeholder:font-sfpro placeholder:text-base placeholder:text-[#d9d9d9]" 
                            />
                            <Button
                                variant={"purple"}
                                className="w-[116px] h-[42px]"
                                onClick={handleSearch}
                            >
                                Buscar
                            </Button>
                        </search>
                    </div>
                </nav>
                <section className="flex flex-col w-full items-center gap-8">
                    <div className="flex w-full h-auto justify-between items-center">
                        <menu className="flex w-max h-[62px] p-2 gap-2 rounded-xl bg-[#f0f0f0]">
                            <button className={`w-auto h-[46px] px-4 py-3 rounded-xl font-sfpro text-base text-[#101010] leading-[1.1] ${
                                isHistory ? 'bg-white' : 'bg-transparent'}`}
                                onClick={() => handleTabChange('history')}
                                >Histórico</button>
                            <button className={`w-auto h-[46px] px-4 py-3 rounded-xl font-sfpro text-base text-[#101010] leading-[1.1] ${
                                isSchedule ? 'bg-white' : 'bg-transparent'}`}
                                onClick={() => handleTabChange('schedule')}
                                >Agendamento</button>
                        </menu>
                        <div className="flex h-full gap-4">
                            <DatePicker onChange={setDateFrom} />
                            <DatePicker onChange={setDateTo} />
                        </div>
                    </div>
                    <div
                        className="grid gap-6 grid-cols-1 2xl:grid-cols-2 4xl:grid-cols-3"
                    >
                        {filteredCards.map(card => (
                            <CardWeb
                                key={card.id}
                                date={card.date}
                                time={card.time}
                                petName={card.petName}
                                ownerName={card.ownerName}
                                doctorName={card.doctorName}
                                appointmentType={card.appointmentType}
                                appointmentStatus={card.appointmentStatus}
                            />
                        ))}
                    </div>
                </section>
                <Button
                    className="fixed right-24 lg:right-48 bottom-[36px] w-[200px] z-50"
                    onClick={() => setShowModal(true)}
                >
                    <Image
                        src="/img/add-circle-icon.svg"
                        alt="Add Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        style={{ filter: "invert(1)" }}
                    />
                    Nova Consulta
                </Button>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <ModalAppointment
                            text1="Tipo de consulta"
                            text2="Médico responsável"
                            text3="Data"
                            text4="Horário"
                            onClose={() => setShowModal(false)}
                            isOpen={showModal}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}