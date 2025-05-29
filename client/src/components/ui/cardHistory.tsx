import * as React from "react"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import "@/styles/fonts.css"

type CardHistoryProps = {
    date: string;
    time: string;
    doctorName: string;
    appointmentType: string; // can be "first", "return", "checkup", or "vaccine"
    onClick?: () => void;
};

export function CardHistory(props: CardHistoryProps) {
    return (
        <Card className="flex justify-between items-center max-w-[510px] w-full h-[82px] rounded-2xl px-6 py-4 gap-[29px] border-none shadow-none bg-[#f0f0f0]">
            <div className="flex flex-col justify-center items-center w-[51px] h-[50px] bg-[rgba(255,255,255,0.8)] rounded-[4px] p-[6px] gap-2">
                <p className="text-[14px] leading-[1.1] font-bold font-sfpro text-black">{props.date}</p>
                <p className="text-[14px] leading-[1.1] font-bold font-sfpro text-black">{props.time}</p>
            </div>
            <p className="text-[14px] leading-[1.1] font-bold font-sfpro text-black">
                {props.appointmentType === "first" && "Primeira Consulta"}
                {props.appointmentType === "return" && "Retorno"}
                {props.appointmentType === "checkup" && "Check-up"}
                {props.appointmentType === "vaccine" && "Vacinação"}
            </p>
            <p className="text-[14px] leading-[1.1] font-normal font-sfpro text-black">{props.doctorName}</p>
            <button onClick={props.onClick}>
                <Image 
                src="/img/arrow-back-icon.svg"
                alt="Right arrow button"
                width={24}
                height={24}
                className="w-6 h-6 rotate-180"
                />
            </button>
        </Card>
    )
}