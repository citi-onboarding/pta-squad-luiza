import react from 'react';
import { LogoCITiPet, LogotipoCITi } from '@/assets';
import { Favorite } from '@/assets';
import "@/styles/fonts.css";
import Image from 'next/image';

interface HeaderProps {
    text1: string; // Atendimento
    text2: string; // Cadastro
    text3: string; // made with
    text4: string; // and </> by
}

export default function Header({ 
    text1, 
    text2, 
    text3, 
    text4 
}: HeaderProps) {
    return (
        <div style = {{ // Container principal
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '114px',
            borderBottom: '1px solid rgba(217, 217, 217, 1)',
            paddingLeft: '48px',
            paddingRight: '48px',
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '16px',
            fontWeight: '400',
        }}> 
            <p style = {{display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px', paddingTop: '20px'}} >
                <Image src = {LogoCITiPet} alt = "logo" />
            </p>

            <div style = {{display: 'flex', width: '196px', height: '42px', gap: '48px'}}>
                <div style={{width: '86px', height:'42px', paddingTop: '12px', 
                    paddingBottom: '12px', borderBottom: '2px solid rgba(80, 230, 120, 1)'}}>
                    <p style = {{color: '#242424'}}>{text1}</p>
                </div>
                <div style = {{width: '62px', height:'42px', paddingTop: '12px', paddingBottom: '12px'}}>
                    <p style = {{color: '#242424'}}>{text2}</p>
                </div>
            </div>

            <div style = {{width: '240px', height: '24px', gap: '4px', color: '#7D1AD7', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center'}}>
                <div>
                    <p>{text3}</p>
                </div>
                <div style = {{paddingTop: '3px', paddingBottom: '3px', paddingLeft: '2px', paddingRight: '2px'}}>
                    <Image src = {Favorite} alt = "favorite" style = {{width: '24px', height: '24px'}} />
                </div>
                <div>
                    <p>{text4}</p>    
                </div>
                <div>
                    <Image src = {LogotipoCITi} alt = "logotipo" style = {{width: '41px', height: '21px'}} />
                </div>
            </div>
        </div>
    );
}