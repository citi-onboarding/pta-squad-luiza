import { View, Text, ScrollView } from "react-native";
import CardMobile from "../../src/components/cardMobile";
import Logo from "../../src/assets/logoCITiPet.svg"; // Certifique-se de que o caminho está correto
import MorningIcon from "../../src/assets/morning-icon.svg"; // Substitua pelo caminho correto se necessário
import AfternoonIcon from "../../src/assets/afternoon-icon.svg"; // Substitua pelo caminho correto se necessário
import NightIcon from "../../src/assets/night-icon.svg";

const MedicalAgenda = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      
      {/* Logomarca */}
      <View className="items-center mb-6">
        <Logo/>
      </View>

      {/* Título e subtítulo */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-black font-sourceCodePro">Sua agenda</Text>
        <Text className="text-sm text-gray-600 font-sfProDisplay">
          Veja aqui todos os seus pacientes agendados para hoje.
        </Text>
      </View>

      {/* Filtros por período */}
      <View className="flex flex-row justify-around items-center bg-white py-3 px-6 mb-6 rounded-full shadow">
        <MorningIcon />
        <AfternoonIcon />
        <NightIcon />
      </View>

      {/* Lista de cards */}
      <View className="gap-4">
        <CardMobile
          date="18/02"
          time="13:00"
          petName="Luna"
          ownerName="João Alves"
          doctorName="Dr. José Carlos"
          appointmentType="first"
          appointmentStatus={false}
        />
        <CardMobile
          date="18/02"
          time="15:00"
          petName="Max"
          ownerName="Ana Paula"
          doctorName="Dr. José Carlos"
          appointmentType="return"
          appointmentStatus={false}
        />
        <CardMobile
          date="18/02"
          time="17:30"
          petName="Bidu"
          ownerName="Carlos Lima"
          doctorName="Dr. José Carlos"
          appointmentType="checkup"
          appointmentStatus={true}
        />
      </View>
    </ScrollView>
  );
};

export default MedicalAgenda;
