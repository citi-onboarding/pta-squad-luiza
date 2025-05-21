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
import { LogoCITiPet, ButtonClose } from "@/assets"

export function ModalRegister() {
  return (
    <Card className="flex flex-col justify-center items-center w-[408px] h-[423px] rounded-3xl p-12 gap-[29px] border-none shadow-none bg-white">
      <CardHeader className="flex flex-row w-full p-0 justify-between items-start">
        <div className="w-6 h-6" />
        <img src={LogoCITiPet.src} alt="CITiPet Logo" className="w-[189px] h-[74px] m-0" />
        <button className="w-6 h-6">
          <img src={ButtonClose.src} alt="Fechar" />
        </button>
      </CardHeader>
      <CardTitle className="w-[230px] text-center text-base font-normal text-[#101010]"><strong>Cadastro finalizado!</strong> Envie o comprovante para o <strong>tutor</strong></CardTitle>
      <CardContent className="w-full p-0">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email" className="text-base font-bold text-[#101010]">E-mail</Label>
              <Input 
              id="email" 
              placeholder="Digite aqui..."
              className="w-full h-[50px] p-4 rounded-[8px] border-solid border-[#101010] text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-[#d9d9d9]" 
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="w-full p-0">
        <Button className="w-full font-normal">Enviar</Button>
      </CardFooter>
    </Card>
  )
}