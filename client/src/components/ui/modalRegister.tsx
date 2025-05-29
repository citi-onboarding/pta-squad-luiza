import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "@/styles/fonts.css"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ModalRegisterProps {
  onClose?: () => void;
  isOpen: boolean;
}

export function ModalRegister(
  {
    onClose,
    isOpen
}: ModalRegisterProps) {
  const [touched, setTouched] = useState(false);
  useEffect(() => {
          if (!isOpen) {
            setTouched(false);
          }
      }, [isOpen]);
  
      if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center p-4">
      <Card className="flex flex-col justify-center items-center w-[408px] h-[423px] rounded-3xl p-12 gap-[29px] border-none shadow-none bg-white">
        <CardHeader className="flex flex-row w-full p-0 justify-between items-start">
          <div className="w-6 h-6" />
          <Image
          src="/img/logo-citi-pet.svg"
          alt="CITiPet Logo"
          width={189}
          height={74}
          className="w-[189px] h-[74px] m-0" />
          <button onClick={onClose} className="w-6 h-6">
            <Image
            src="/img/button-close-icon.svg"
            alt="Close Button"
            width={24}
            height={24}
            className="w-6 h-6"
            />
          </button>
        </CardHeader>
        <CardTitle className="w-[230px] text-center text-base font-normal text-[#101010] font-sfpro"><strong>Cadastro finalizado!</strong> Envie o comprovante para o <strong>tutor</strong></CardTitle>
        <CardContent className="w-full p-0">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="text-base font-bold text-[#101010] font-sfpro">E-mail</Label>
                <Input 
                id="email" 
                placeholder="Digite aqui..."
                className="w-full h-[50px] p-4 rounded-[8px] border-solid border-[#101010] text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-[#d9d9d9] placeholder:font-sfpro" 
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full p-0">
          <Button className="w-full font-normal">Enviar</Button>
        </CardFooter>
      </Card>
    </div>
    
  )
}