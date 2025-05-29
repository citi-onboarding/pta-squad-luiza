"use client";

import { useState } from "react";
import { Header, Button, CardWeb, Input, DatePicker } from "@/components/ui";
import Image from "next/image";

function parseDate(dateStr: string) {
  // Expects dd/MM format, returns a Date object for current year
  const [day, month] = dateStr.split("/").map(Number);
  return new Date(new Date().getFullYear(), month - 1, day);
}

export default function ServicePage() {
    const [isHistory, setIsHistory] = useState(true);
    const [isSchedule, setIsSchedule] = useState(false);
    const [dateFrom, setDateFrom] = useState<Date | undefined>();
    const [dateTo, setDateTo] = useState<Date | undefined>();

    const handleTabChange = (tab:string) => {
        setIsHistory(tab === 'history');
        setIsSchedule(tab === 'schedule');
    };

    return (
        <div className="flex flex-col items-center w-full h-full bg-white">
            <Header text1="Agendamento" text2="Cadastro" text3="made with" text4="and </> by" />
            <div className="flex flex-col w-[1532px] h-auto mt-12 gap-10">
                <nav className="flex flex-col gap-8">
                    <p className="font-sourcecode font-bold text-5xl text-black">Atendimento</p>
                    <div className="flex flex-col h-auto gap-6">
                        <p className="font-sfpro font-normal text-2xl text-black">Qual é o médico?</p>
                        <search className="flex items-center h-auto gap-6">
                            <Input 
                            id="doctorName"
                            placeholder="Pesquise aqui..."
                            className="w-[520px] h-[50px] border-[#101010] p-4 placeholder:font-sfpro placeholder:text-base placeholder:text-[#d9d9d9]" 
                            />
                            <Button variant={"purple"} className="w-[116px] h-[42px]">
                                Buscar
                            </Button>
                        </search>
                    </div>
                </nav>
                <section className="flex flex-col gap-8">
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
                    <div className="grid gap-6 grid-cols-3 grid-rows-2 grid-flow-col">
                        <CardWeb 
                            date="10/06"
                            time="09:00"
                            petName="Mimi"
                            ownerName="João Silva"
                            doctorName="Dr. Ana Souza"
                            appointmentType="first"
                            appointmentStatus={false}
                        />
                        <CardWeb 
                            date="11/06"
                            time="10:30"
                            petName="Mimi"
                            ownerName="João Silva"
                            doctorName="Dr. Gustavo Silva"
                            appointmentType="return"
                            appointmentStatus={false}
                        />
                        <CardWeb 
                            date="12/06"
                            time="14:00"
                            petName="Mimi"
                            ownerName="João Silva"
                            doctorName="Dra. Fernanda Lima"
                            appointmentType="checkup"
                            appointmentStatus={false}
                        />
                        <CardWeb 
                            date="13/06"
                            time="11:15"
                            petName="Mimi"
                            ownerName="João Silva"
                            doctorName="Dr. Lucas Almeida"
                            appointmentType="vaccine"
                            appointmentStatus={false}
                        />
                        <CardWeb 
                            date="15/06"
                            time="13:30"
                            petName="Mimi"
                            ownerName="João Silva"
                            doctorName="Dr. Gustavo Silva"
                            appointmentType="checkup"
                            appointmentStatus={false}
                        />
                        <CardWeb 
                            date="16/06"
                            time="15:45"
                            petName="Mimi"
                            ownerName="João Silva"
                            doctorName="Dra. Fernanda Lima"
                            appointmentType="vaccine"
                            appointmentStatus={false}
                        />
                    </div>
                </section>
                <Button className="relative right-0 bottom-0 w-[200px]">
                    <Image
                        src="/img/add-circle-icon.svg"
                        alt="Add Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        // style={{ filter: "invert(1)" }}
                    />
                    Nova Consulta
                </Button>
            </div>
        </div>
    );
}