"use client";

import { useEffect, useState } from "react";
import { Header, Button, CardWeb, Input, DatePicker } from "@/components/ui";
import { ModalAppointment } from "@/components/ui/modalAppointment";
import Image from "next/image";
import { Appointment, getAppointments } from "@/services/Appointments";

export default function ServicePage() {
    const [isHistory, setIsHistory] = useState(true);
    const [isSchedule, setIsSchedule] = useState(false);
    const [dateFrom, setDateFrom] = useState<Date | undefined>();
    const [dateTo, setDateTo] = useState<Date | undefined>();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
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
    
    useEffect(() => {
        async function fetchAppointments() {
            try {
                const data = await getAppointments();
                setAppointments(data);
            } catch (error) {
                setAppointments([]);
                console.error("Error fetching appointments:", error);
            }
        };

        async function fetchPatients() {
            try {
                const data = await getPatients();
                setPatients(data);
            } catch (error) {
                setPatients([]);
                console.error("Error fetching patients:", error);
            }
        };

        fetchAppointments();
        fetchPatients();
    }, []);
    
    const filteredAppointments = appointments.filter((appointment) => {
        const dateTimeNow = new Date(Date.now());
        const dateTime = new Date(appointment.dataHora);

        if (isHistory) {
            if (!(dateTime < dateTimeNow)) return false;
        }

        if (isSchedule) {
            if (!(dateTime >= dateTimeNow)) return false;
        }

        if (dateFrom && dateTime < dateFrom) return false;
        if (dateTo && dateTime > dateTo) return false;
        if (searchTerm && !appointment.nomeVeterinario.toLowerCase().includes(searchTerm.toLowerCase())) return false;
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
                        {filteredAppointments.map((appointment) => (
                            <CardWeb
                                key={appointment.id}
                                date={appointment.dataHora.split("T")[0].slice(5, 10)}
                                time={appointment.dataHora.split("T")[1].slice(0, 5)}
                                petName={patient.nome}
                                ownerName={patient.nomeTutor}
                                doctorName={appointment.nomeVeterinario}
                                appointmentType={appointment.tipo}
                                appointmentStatus={appointment.appointmentStatus}
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