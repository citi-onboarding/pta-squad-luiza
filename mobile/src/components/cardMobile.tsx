import React from "react";
import { View, Text, Image } from "react-native";

type CardMobileProps = {
    date: string;
    time: string;
    petName: string;
    ownerName: string;
    doctorName: string;
    appointmentType: string;
    appointmentStatus: boolean; // true when the current time is past the appointment time, false otherwise
};

const CardMobile = (props: CardMobileProps) => {
    return (
        <View
        className={`flex flex-row justify-between items-center w-[358px] h-[122px] rounded-2xl px-6 py-4 ${
            props.appointmentStatus ? "bg-[rgba(240,240,240,1)]" :
            props.appointmentType === "first" ? "bg-[rgba(191,181,255,1)]" : 
            props.appointmentType === "return" ? "bg-[rgba(255,100,25,0.6)]" :
            props.appointmentType === "checkup" ? "bg-[rgba(156,255,149,1)]" :
            props.appointmentType === "vaccine" ? "bg-[rgba(170,225,255,1)]" : ""
        }`}
        >
            <View className="flex flex-col justify-center items-center w-[51px] h-[90px] bg-[rgba(255,255,255,0.8)] rounded-[4px] px-[6px] py-3 gap-2">
                <Image
                source={require('@assets/alarm-icon.png')}
                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
                <Text className="text-[14px] leading-[1.1] font-bold font-sfpro text-[#101010]">{props.date}</Text>
                <Text className="text-[14px] leading-[1.1] font-bold font-sfpro text-[#101010]">{props.time}</Text>
            </View>
            <View className="flex flex-col w-auto h-auto gap-3">
                <Text className="text-sm font-normal font-sfpro text-black"><strong>{props.petName}</strong>/{props.ownerName}</Text>
                <Text className="text-sm font-normal font-sfpro text-black">{props.doctorName}</Text>
            </View>
            <View className="flex flex-col items-center gap-2">
                <Image
                source={require('@assets/cat-image.png')}
                style={{ width: 57, height: 57, resizeMode: 'contain' }}
                />
                <Text className="w-[108px] p-[6px] rounded-[4px] text-center text-xs font-normal font-sfpro text-nowrap text-[rgba(41,41,41,1)] bg-[rgba(255,255,255,0.8)]">
                    {props.appointmentType === "first" && "Primeira Consulta"}
                    {props.appointmentType === "return" && "Retorno"}
                    {props.appointmentType === "checkup" && "Check-up"}
                    {props.appointmentType === "vaccine" && "Vacinação"}
                </Text>
            </View>
        </View>
    );
};

export default CardMobile;