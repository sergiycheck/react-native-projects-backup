import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./src/routes/app.routes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </SafeAreaView>
  );
}
