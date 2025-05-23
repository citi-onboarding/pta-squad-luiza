import {CardWeb} from "@/components/ui/cardWeb";

export default function CardWebPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CardWeb
        date="12/12"
        time="12:00"
        petName="Luna"
        ownerName="João Alves"
        doctorName="Dr. Silva"
        appointmentType="return"
        appointmentStatus={true}
      />
    </div>
  );
}