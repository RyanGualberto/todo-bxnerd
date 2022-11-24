import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Routes from "./src/routes/index.routes";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Routes />
    </SafeAreaView>
  );
}
