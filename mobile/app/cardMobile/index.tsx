import { View } from "react-native";
import CardMobile from "../../src/components/cardMobile";

const CardMobilePage = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
        <CardMobile
        date="18/02"
        time="13:00"
        petName="Buddy"
        ownerName="John Doe"
        doctorName="Dr. Smith"
        appointmentType="vaccine"
        appointmentStatus={true}
        />
    </View>
  );
};

export default CardMobilePage;