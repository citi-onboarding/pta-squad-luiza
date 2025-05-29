import { View, Text } from "react-native";
import MedicalAgenda from "./medicalAgenda/page";

const App: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    {/* <Text className="text-xl font-barlowBold text-[#58cbfb]">
      Made with &lt; / &gt; and 🩵 by CITi
    </Text> */}
    <MedicalAgenda />
  </View>
);

export default App;
