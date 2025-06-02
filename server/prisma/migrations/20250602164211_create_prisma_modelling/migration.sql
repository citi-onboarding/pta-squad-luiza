/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EspeciePaciente" AS ENUM ('OVELHA', 'GATO', 'PORCO', 'VACA', 'CAVALO', 'CACHORRO');

-- CreateEnum
CREATE TYPE "TipoConsulta" AS ENUM ('PRIMEIRA', 'VACINA', 'RETORNO', 'AVALIACAO');

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeTutor" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "especie" "EspeciePaciente" NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoConsulta" NOT NULL,
    "descricao" TEXT NOT NULL,
    "nomeVeterinario" TEXT NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
