"use client";
import React from "react";
import "@/styles/fonts.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ModalRegister } from "@/components/ui/modalRegister";

export default function Register() {
    const router = useRouter();
    const handleBackClick = () => { router.back(); }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
    const animals = [
        { name: "sheep", src: "/img/sheep.svg", width: 100, height: 100 },
        { name: "cat", src: "/img/cat.svg", width: 98.37, height: 99.66 },
        { name: "pig", src: "/img/pig.svg", width: 100, height: 100 },
        { name: "giraffe", src: "/img/giraffe.svg", width: 100, height: 100 },
        { name: "horse", src: "/img/horse.svg", width: 100, height: 100 },
        { name: "dog", src: "/img/dog.svg", width: 82, height: 99 },
    ];

    const [nomePaciente, setNomePaciente] = useState("");
    const [nomeTutor, setNomeTutor] = useState("");
    const [idadePaciente, setIdadePaciente] = useState("");
    const [tipoConsulta, setTipoConsulta] = useState("");
    const [medico, setMedico] = useState("");
    const [dataAtendimento, setDataAtendimento] = useState("");
    const [horario, setHorario] = useState("");
    const [descricao, setDescricao] = useState("");

    const isFormValid =
        nomePaciente &&
        nomeTutor &&
        idadePaciente &&
        tipoConsulta &&
        medico &&
        dataAtendimento &&
        horario &&
        descricao &&
        selectedAnimal;

    return (
        <div className="flex flex-col w-[1920px] max-h-screen bg-[rgba(255,255,255,1)] font-sfpro text-base font-[700]">
            <Header text1="Atendimento"
                text2="Cadastro"
                text3="made with"
                text4="and </> by" />
            
            <div className="flex flex-col items-start pl-[194px]">
                <div className="flex flex-row items-start gap-4 pt-12">
                    <button onClick={handleBackClick}>
                        <Image src="/img/arrow_back_ios_new.svg" alt="arrow-back" width={15.7} height={26.67}/>
                    </button>
                    
                    <h1 className="w-[231px] h-[53px] text-[48px] font-[700] font-sourcecode">Cadastro</h1>
                </div>

                <div className="flex flex-col w-[1532px] h-[644px] items-start gap-[24px] pt-[16px]">
                    <div className="flex w-fill h-[80px] gap-[24px] self-stretch">
                        <div className="flex w-[754px] h-[80px] gap-[12px] items-start flex-col">
                            <p>Nome do Paciente</p>

                            <Input 
                            value={nomePaciente}
                            onChange={e => setNomePaciente(e.target.value)}
                            className="w-[754px] h-[50px] items-center self-stretch border-solid rounded-[8px] border-black font-[400] text-[#5e5e5e]" placeholder="Digite aqui..."></Input>
                        </div>

                        <div className="flex w-[754px] h-[80px] gap-[12px] items-start flex-col">
                            <p>Nome do Tutor</p>

                            <Input 
                            value={nomeTutor}
                            onChange={e => setNomeTutor(e.target.value)}
                            className="w-[754px] h-[50px] items-center self-stretch border-solid rounded-[8px] border-black font-[400] text-[#5e5e5e]" placeholder="Digite aqui..."></Input>
                        </div>
                    </div>

                    <div className="flex w-[1042.4px] h-[174px] gap-[12px] flex-col items-start">
                        <p>Qual é a espécie do paciente?</p>
                        <div className="flex w-[1042.4px] h-[144px] p-[12px] gap-[60px] items-end self-stretch">
                            {animals.map(animal => (
                                <div
                                    key={animal.name}
                                    className={`w-[120px] h-[120px] flex p-[10px] items-center gap-[10px] rounded-lg cursor-pointer transition-colors
                                        ${selectedAnimal === animal.name
                                            ? "bg-[rgba(217,217,217,1)]"
                                            : "bg-[rgba(255,255,255,1)]"
                                        }`}
                                    onClick={() => setSelectedAnimal(animal.name)}
                                >
                                    <Image src={animal.src} alt={animal.name} width={animal.width} height={animal.height} />
                                </div>
                            ))}
                        </div>
                    </div>
                        
                    <div className="w-[1532px] h-[80px] flex items-center gap-[28px] self-stretch">
                        <div className="flex w-[754px] h-[80px] gap-[12px] items-start flex-col">
                            <p>Idade do Paciente</p>
                            <Input 
                            value={idadePaciente} 
                            onChange={e => setIdadePaciente(e.target.value)}
                            className="w-[754px] h-[50px] items-center self-stretch border-solid rounded-[8px] border-black font-[400] text-[#5e5e5e]" placeholder="Digite aqui..." />
                        </div>

                        <div className="flex w-[754px] h-[80px] gap-[12px] items-start flex-col">
                            <p>Tipo de consulta</p>

                            <select name="Selecione aqui"
                                    id="tipo"
                                    form="tipo"
                                    className="w-[754px] h-[50px] px-2 items-center self-stretch border rounded-[8px] border-black font-[400] text-[#5e5e5e] font-sfpro text-[15px]"
                                    defaultValue=""
                                    value={tipoConsulta} 
                                    onChange={e => setTipoConsulta(e.target.value)}
                            >
                                <option value="" disabled>Selecione aqui</option>
                                <option value="tipo 1">Primeira consulta</option>
                                <option value="tipo 2">Vacinação</option>
                                <option value="tipo 3">Retorno</option>
                                <option value="tipo 4">Check-up</option>
                                    
                            </select>
                        </div>
                    </div>

                    <div className="w-[1532px] h-[80px] flex items-center gap-[28px] self-stretch">
                        <div className="flex w-[696px] h-[80px] gap-[12px] items-start flex-col">
                            <p>Médico Responsável</p>
                            <Input 
                            value={medico} 
                            onChange={e => setMedico(e.target.value)}
                            className="w-[696px] h-[50px] items-center self-stretch border-solid rounded-[8px] border-black font-[400] text-[#5e5e5e]" placeholder="Digite aqui..."/>
                        </div>

                        <div className="flex w-[390px] h-[80px] gap-[12px] items-start flex-col">
                            <p>Data do atendimento</p>
                            <input 
                            value={dataAtendimento} 
                            onChange={e => setDataAtendimento(e.target.value)}
                            type="date" id="date" placeholder="dd/mm/aaaa" min={new Date().toISOString().split('T')[0]} className="border border-[#101010] w-[390px] h-[50px] text-base rounded-[8px] px-3 font-[400] text-[#5e5e5e] font-sfpro text-[15px]" />
                        </div>

                        <div className="flex w-[390px] h-[80px] gap-[12px] items-start flex-col">
                            <p>Horário do atendimento</p>
                            <input 
                            value={horario} 
                            onChange={e => setHorario(e.target.value)}
                            type="time" name="00:00" className="border border-[#101010] w-[390px] h-[50px] text-base rounded-[8px] px-3 font-[400] text-[#5e5e5e] font-sfpro text-[15px]"/>
                        </div>
                    </div>

                    <div className="flex w-[1532px] h-[134px] gap-[12px] items-start flex-col self-stretch">
                        <p>Descriçao do Problema</p>
                        <textarea 
                        value={descricao} 
                        onChange={e => setDescricao(e.target.value)}
                        className="w-[1532px] h-[104px] flex items-start justify-start self-stretch border pl-3 py-3 rounded-[8px] border-black font-[400] text-[#5e5e5e]" placeholder="Digite aqui..."/>
                    </div>
                </div>

            </div>

            <div className="flex w-[205px] h-[48px] pt-[100px] pl-[1728px] pb-[76px] justify-end items-center gap-[10px] shrink-0">
                <Button onClick={handleClick} 
                className="w-[205px] h-[48px] py-3 px-8"
                disabled={!isFormValid}
                >Finalizar Cadastro</Button>
                <ModalRegister isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>

        </div>
    );
}