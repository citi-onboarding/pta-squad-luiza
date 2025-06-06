"use client";

import { useEffect, useState } from "react";
import { Header, Button, CardWeb, Input, DatePicker } from "@/components/ui";
import Image from "next/image";
import { Appointment, getAppointments } from "@/services/Appointments";
import { Patient, getPatients } from "@/services/Patients";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function ServicePage() {
    const router = useRouter();
    const [isHistory, setIsHistory] = useState(true);
    const [isSchedule, setIsSchedule] = useState(false);
    const [dateTo, setDateTo] = useState<Date | undefined>();
    const [dateFrom, setDateFrom] = useState<Date | undefined>();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchInput, setSearchInput] = useState(""); // for input field
    const [searchTerm, setSearchTerm] = useState("");   // for filtering

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
        const dateTimeNow = new Date();
        const dateTime = new Date(appointment.dataHora);

        // Filtering be Tab: History or Schedule
        if (isHistory) {
            if (!(dateTime < dateTimeNow)) return false;
        }

        if (isSchedule) {
            if (!(dateTime >= dateTimeNow)) return false;
        }

        // Filtering by Date Range
        if (dateFrom && dateTime < dateFrom) return false;
        if (dateTo && dateTime > dateTo) return false;

        // Filtering by Doctor Name
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
                        <div className="flex items-center h-auto gap-6">
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
                        </div>
                    </div>
                </nav>
                <section className="flex flex-col w-full items-center gap-8">
                    <div className="flex w-full h-auto justify-between items-center">
                        <div className="flex w-max h-[62px] p-2 gap-2 rounded-xl bg-[#f0f0f0]">
                            <button className={`w-auto h-[46px] px-4 py-3 rounded-xl font-sfpro text-base text-[#101010] leading-[1.1] ${
                                isHistory ? 'bg-white' : 'bg-transparent'}`}
                                onClick={() => handleTabChange('history')}
                                >Histórico</button>
                            <button className={`w-auto h-[46px] px-4 py-3 rounded-xl font-sfpro text-base text-[#101010] leading-[1.1] ${
                                isSchedule ? 'bg-white' : 'bg-transparent'}`}
                                onClick={() => handleTabChange('schedule')}
                                >Agendamento</button>
                        </div>
                        <div className="flex h-full gap-4">
                            <DatePicker onChange={setDateFrom} />
                            <DatePicker onChange={setDateTo} />
                        </div>
                    </div>
                    <div
                        className="grid gap-6 grid-cols-1 2xl:grid-cols-2 4xl:grid-cols-3"
                    >
                        {filteredAppointments.map((appointment) => {
                            const patient = patients.find(p => p.id === appointment.pacienteId);
                            const dateObj = new Date(appointment.dataHora).getTime() + 3*60*60*1000; // Adjusting for timezone
                            const now = new Date().getTime() + 3*60*60*1000; // Adjusting for timezone

                            return (
                                <button
                                    key={appointment.id}
                                    onClick={() => router.push(`/AppointmentDetails/${patient?.id}/${appointment.id}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <CardWeb
                                        date={format(dateObj, "dd/MM")}
                                        time={format(dateObj, "HH:mm")}
                                        petName={patient ? patient.nome : "Desconhecido"}
                                        ownerName={patient ? patient.nomeTutor : "Desconhecido"}
                                        doctorName={appointment.nomeVeterinario}
                                        appointmentType={appointment.tipo}
                                        appointmentStatus={now > dateObj}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </section>
                <Button
                    className="fixed right-24 lg:right-48 bottom-[36px] w-[200px] z-50"
                    onClick={() => router.push("/Register")}
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
            </div>
        </div>
    );
}