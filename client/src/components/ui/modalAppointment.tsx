"use client";
import React from 'react';
import { useState } from 'react';
import { ArrowDown, ButtonClose, LogoCITiPet,  } from '@/assets';
import "@/styles/fonts.css";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from 'react';


interface ModalAppointmentProps {
    text1:string;
    text2:string;
    text3:string;
    text4:string;}

export default function ModalAppointment({
    text1,
    text2,
    text3,
    text4
}:ModalAppointmentProps) {
    const dateInputRef = useRef<HTMLInputElement>(null);

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

    return (
        <div className='flex flex-col justify-center items-center w-[824px] h-[493px] rounded-3xl p-12 gap-[29px] bg-white font-sfpro text-base font-normal'>
            <div className='flex flex-row flex-wrap w-[728px] h-[74px] justify-between items-start'>
                <div className='w-6 h-6' />
                <Image src={LogoCITiPet} alt="CITiPet Logo" className="w-[189px] h-[74px] m-0" />
                <button>
                    <Image src={ButtonClose} alt="Fechar" className='w-6 h-6'/>
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
                                    defaultValue=""
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
                                    <Image src={ArrowDown} alt="Arrow Down" width={20} height={20} />
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
                                className="bg-white border border-[#101010] w-[358px] h-[50px] text-base rounded-[8px] px-4"
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
                            />
                        </p>
                        
                    </div>
                </div>
            </div>

            <div>
                <Button className='w-[728px] h-[42px] py-3 px-8 g-[10px]'>
                    <p className='text-[rgba(255, 255, 255, 1)] font-[500]'>Finalizar cadastro</p>
                </Button>
            </div>
            
        </div>

    )
}