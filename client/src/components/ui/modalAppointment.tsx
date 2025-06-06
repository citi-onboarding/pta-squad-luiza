"use client";
import React, { useEffect, useRef, useState } from 'react';
import "@/styles/fonts.css";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAppointment } from '@/services/Appointments';

interface ModalAppointmentProps {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    onClose?: () => void;
    isOpen: boolean;
}

export function ModalAppointment({
    text1,
    text2,
    text3,
    text4,
    onClose,
    isOpen
}: ModalAppointmentProps) {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const [tipo, setTipo] = useState('');
    const [medico, setMedico] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataMinima = `${ano}-${mes}-${dia}`;

        if (dateInputRef.current) {
            dateInputRef.current.min = dataMinima;
        }
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setTipo('');
            setMedico('');
            setData('');
            setHora('');
            setTouched(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const isFormValid = tipo && medico && data && hora;

    const handleSubmit = async () => {
        setTouched(true);
        if (!isFormValid) return;

        try {
            await createAppointment({
                pacienteId: 123, // Replace with actual patient ID
                nomeVeterinario: medico,
                dataHora: `${data}T${hora}`,
                tipo,
                descricao: "",
            });
            if (onClose) onClose();
        } catch (error) {
            console.error("Erro ao cadastrar consulta:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <div className='flex flex-col justify-center items-center w-[824px] h-[493px] rounded-3xl p-12 gap-[29px] bg-white font-sfpro text-base font-normal'>
                <div className='flex flex-row flex-wrap w-[728px] h-[74px] justify-between items-start'>
                    <div className='w-6 h-6' />
                    <Image
                        src="/img/logo-citi-pet.svg"
                        alt="CITiPet Logo"
                        width={189}
                        height={74}
                        className="w-[189px] h-[74px] m-0"
                    />
                    <button onClick={onClose}>
                        <Image
                            src="/img/button-close-icon.svg"
                            alt="Close Button"
                            width={24}
                            height={24}
                            className='w-6 h-6'
                        />
                    </button>
                </div>

                <div className='text-[rgba(16, 16, 16, 1)] flex flex-row gap-1'>
                    <p className='font-[700]'>O pet já está cadastrado no sistema!</p>
                    <p>Preencha os dados da</p>
                    <p className='font-[700]'>consulta</p>
                </div>

                <div className='flex flex-row gap-3 w-[824px] h-[172px] justify-between px-12'>
                    <div className='flex flex-col gap-2 w-[824px] h-[80px]'>
                        <div className='flex flex-col gap-2 w-[358px] h-[80px]'>
                            <p className='font-[700]'>{text1}</p>
                            <div>
                                <div className="relative w-[358px]">
                                    <select
                                        name="Selecione aqui"
                                        id="tipo"
                                        form="tipo"
                                        className="w-full h-[50px] text-base rounded-[8px] pr-10 pl-4 border border-[#101010] bg-white appearance-none"
                                        value={tipo}
                                        onChange={e => setTipo(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Selecione aqui
                                        </option>
                                        <option value="tipo 1">Primeira consulta</option>
                                        <option value="tipo 2">Vacinação</option>
                                        <option value="tipo 3">Retorno</option>
                                        <option value="tipo 4">Check-up</option>
                                    </select>
                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                        <Image
                                            src="/img/arrow-down-icon.svg"
                                            alt="Dropdown Menu Button"
                                            width={20}
                                            height={20}
                                            className="w-5 h-5 rotate-180"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-[358px] h-[80px]'>
                            <p className='font-[700]'>{text3}</p>
                            <p>
                                <input
                                    type="date"
                                    id="date"
                                    ref={dateInputRef}
                                    placeholder="dd/mm/aaaa"
                                    min={new Date().toISOString().split('T')[0]}
                                    className="bg-white border border-[#101010] w-[358px] h-[50px] text-base rounded-[8px] px-4"
                                    value={data}
                                    onChange={e => setData(e.target.value)}
                                />
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-[824px] h-[80px]'>
                        <div className='flex flex-col gap-2 w-[358px] h-[80px]'>
                            <p className='font-[700]'>{text2}</p>
                            <Input
                                id="Médico resposável"
                                placeholder="Digite aqui..."
                                className="w-full h-[50px] p-4 rounded-[8px] border-solid border-[#101010] text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-black placeholder:font-sfpro"
                                value={medico}
                                onChange={e => setMedico(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-[358px] h-[80px]'>
                            <p className='font-[700]'>{text4}</p>
                            <p>
                                <input
                                    type="time"
                                    id="horário"
                                    placeholder="00:00"
                                    className="bg-white border border-[#101010] w-[358px] h-[50px] text-base rounded-[8px] px-4"
                                    value={hora}
                                    onChange={e => setHora(e.target.value)}
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <Button
                        className='w-[728px] h-[42px] py-3 px-8 g-[10px]'
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                    >
                        <p className='text-[rgba(255, 255, 255, 1)] font-[500]'>Finalizar cadastro</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}