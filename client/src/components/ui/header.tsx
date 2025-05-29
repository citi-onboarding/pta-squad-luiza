"use client";
import React from 'react';
import { useState } from 'react';
import "@/styles/fonts.css";
import Image from 'next/image';

interface HeaderProps {
    text1: string; // Atendimento
    text2: string; // Cadastro
    text3: string; // made with
    text4: string; // and </> by
}

export function Header({ 
    text1, 
    text2, 
    text3, 
    text4 
}: HeaderProps) {
    const [isAppointment, setIsAppointment] = useState(true);
    const [isRegistration, setIsRegistration] = useState(false);

    const handleTabChange = (tab:string) => {
        setIsAppointment(tab === 'appointment');
        setIsRegistration(tab === 'registration');
    };
    return (
        <div className='flex flex-row flex-wrap items-center justify-between w-full h-[114px] border-b border-[rgba(217,217,217,1)] px-12 font-sfpro text-base font-normal'> 
            <p style = {{display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px', paddingTop: '20px'}} >
                <Image 
                src="/img/logo-citi-pet.svg"
                alt = "CITiPet Logo"
                width={189}
                height={74}
                className='w-[189px] h-[74px]'
                />
            </p>

            <div className='flex w-48 h-[42px] gap-12'>
                <button
                    onClick={() => handleTabChange('appointment')}
                    className={`w-auto h-[42px] py-3 border-b-2 ${
                        isAppointment ? 'border-[#50E678]' : 'border-transparent'
                    }`}
                >
                    <p className='text-[#242424]'>{text1}</p>
                </button>
                <button 
                    onClick={() => handleTabChange('registration')}
                    className={`w-auto h-[42px] py-3 border-b-2 ${
                        isRegistration ? 'border-[#50E678]' : 'border-transparent'
                    }`}>
                
                    <p className='text-[#242424]'>{text2}</p>
                </button>
            </div>

            <div className='w-60 h-6 gap-1 text-[#7D1AD7] flex flex-wrap flex-row content-center'>
                <div>
                    <p>{text3}</p>
                </div>
                <div className='pb-[3px] px-[2px]'>
                    <Image
                    src="/img/favorite-icon.svg"
                    alt = "Favorite"
                    width={24}
                    height={24}
                    className='w-6 h-6'
                    />
                </div>
                <div>
                    <p>{text4}</p>    
                </div>
                <div>
                    <Image 
                    src="/img/logo-citi-purple.svg"
                    alt="CITi Logo"
                    width={41}
                    height={21}
                    className='w-[41px] h-[21px]'
                    />
                </div>
            </div>
        </div>
    );
}