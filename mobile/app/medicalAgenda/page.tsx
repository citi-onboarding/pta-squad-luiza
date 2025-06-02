import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import CardMobile from "../../src/components/cardMobile";

const appointments = [
  {
    date: "18/02",
    time: "13:00",
    petName: "Luna",
    ownerName: "João Alves",
    doctorName: "Dr. José Carlos",
    appointmentType: "first",
    appointmentStatus: false,
  },
  {
    date: "18/02",
    time: "15:00",
    petName: "Max",
    ownerName: "Ana Paula",
    doctorName: "Dr. José Carlos",
    appointmentType: "return",
    appointmentStatus: false,
  },
  {
    date: "18/02",
    time: "17:30",
    petName: "Bidu",
    ownerName: "Carlos Lima",
    doctorName: "Dr. José Carlos",
    appointmentType: "checkup",
    appointmentStatus: true,
  },
  {
    date: "18/02",
    time: "09:00",
    petName: "Thor",
    ownerName: "Lucas Silva",
    doctorName: "Dr. José Carlos",
    appointmentType: "checkup",
    appointmentStatus: false,
  },
  {
    date: "18/02",
    time: "19:30",
    petName: "Mel",
    ownerName: "Juliana Dias",
    doctorName: "Dr. José Carlos",
    appointmentType: "return",
    appointmentStatus: true,
  },
];

const MedicalAgenda = () => {
  const [filter, setFilter] = useState<"morning" | "afternoon" | "night" | null>(null);

  const filterAppointments = () => {
    if (!filter) return appointments;

    return appointments.filter((a) => {
      const hour = parseInt(a.time.split(":")[0], 10);

      if (filter === "morning") return hour >= 8 && hour < 12;
      if (filter === "afternoon") return hour >= 12 && hour < 18;
      if (filter === "night") return hour >= 18 && hour <= 23;
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-col bg-white max-w-md w-full h-full px-4 pt-12 mx-auto">
        {/* Logomarca */}
        <View className="items-center mb-6">
          <Image
            source={require('../../src/assets/citi-logo.png')}
            style={{ width: 143, height: 54, resizeMode: 'contain' }}
          />
        </View>

        {/* Título e subtítulo */}
        <View className="mb-6">
          <Text className="text-2xl font-bold font-sfpro text-black">
            Sua agenda
          </Text>
          <Text className="text-sm font-normal font-sfpro text-[#6B7280]">
            Veja aqui todos os seus pacientes agendados para hoje.
          </Text>
        </View>

        {/* Filtros por período */}
        <View className="mx-auto flex-row justify-around items-center bg-white w-[252] h-[70] mb-6 rounded-full shadow">
          <TouchableOpacity onPress={() => setFilter("morning")}>
            <Image
              source={require('@assets/morning-icon.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: filter === "morning" ? "#50E678" : undefined,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("afternoon")}>
            <Image
              source={require('@assets/afternoon-icon.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: filter === "afternoon" ? "#50E678" : undefined,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("night")}>
            <Image
              source={require('@assets/night-icon.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: filter === "night" ? "#50E678" : undefined,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Lista de cards filtrados */}
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="flex items-center space-y-6 py-2">
            {filterAppointments().map((appt, index) => (
              <CardMobile key={index} {...appt} />
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View className="absolute bottom-0 left-0 w-full h-[75] bg-[#50E678] rounded-t-[24px]" />
      </View>
    </View>
  );
};

export default MedicalAgenda;
