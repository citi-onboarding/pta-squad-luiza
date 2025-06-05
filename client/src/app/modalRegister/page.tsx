"use client";
import { ModalRegister } from "@/components/ui/modalRegister";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <ModalRegister isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}