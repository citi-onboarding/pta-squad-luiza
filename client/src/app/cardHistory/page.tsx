import { CardHistory } from "@/components/ui/cardHistory";

export default function CardHistoryPage() {
    return (
        <div className="flex justify-center items-center w-full h-full bg-white">
            <CardHistory
                date="18/02"
                time="13:00"
                doctorName="Dr. Smith"
                appointmentType="vaccine" // can be "first", "return", "checkup", or "vaccine"
            />
        </div>
    );
}