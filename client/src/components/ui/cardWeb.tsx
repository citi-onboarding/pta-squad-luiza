import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cat, alarmIcon } from "@/assets"

type CardWebProps = {
    date: string;
    time: string;
    petName: string;
    ownerName: string;
    doctorName: string;
    appointmentType: string;
    appointmentStatus: boolean; // true when the current time is past the appointment time, false otherwise
}

export function CardWeb(props: CardWebProps) {
  return (
    <Card
     
        className={`flex flex-row justify-between items-center w-[494px] h-[135px] rounded-2xl px-6 py-4 ${
            props.appointmentStatus ? "bg-[rgba(240,240,240,1)]" :
            props.appointmentType === "first" ? "bg-[rgba(191,181,255,1)]" : 
            props.appointmentType === "return" ? "bg-[rgba(255,100,25,0.6)]" :
            props.appointmentType === "checkup" ? "bg-[rgba(156,255,149,1)]" :
            props.appointmentType === "vaccine" ? "bg-[rgba(170,225,255,1)]" : ""
        }`}
        >
        <div className="flex flex-col justify-center items-center w-[51px] h-[90px] bg-white/80 rounded px-[6px] py-3 gap-2">
            <img
                src={alarmIcon.src}
                alt="Alarm Icon"
                className="w-5 h-5 object-contain"
            />
            <p className="text-[14px] leading-[1.1] font-bold font-sfpro text-[#101010]">{props.date}</p>
            <p className="text-[14px] leading-[1.1] font-bold font-sfpro text-[#101010]">{props.time}</p>
        </div>
        
        <p className="text-sm font-normal font-sfpro text-black"><strong>{props.petName}</strong>/{props.ownerName}</p>
        <p className="text-sm font-normal font-sfpro text-black">{props.doctorName}</p>
        
        <div className="flex flex-col items-center gap-2">
            <img
            src={cat.src}
            alt="Cat Icon"
            className="w-[69px] h-[70px] object-contain"
            />
            <p className="w-[108px] p-[6px] rounded-[4px] text-center text-xs font-normal font-sfpro text-nowrap text-[rgba(41,41,41,1)] bg-[rgba(255,255,255,0.8)]">
                {props.appointmentType === "first" && "Primeira Consulta"}
                {props.appointmentType === "return" && "Retorno"}
                {props.appointmentType === "checkup" && "Check-up"}
                {props.appointmentType === "vaccine" && "Vacinação"}
            </p>
        </div>
    </Card>
  )
}
