import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import UserContextProvider from "./src/contexts/userContext";
import Routes from "./src/routes/index.routes";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserContextProvider>
        <StatusBar style="auto" />
        <Routes />
      </UserContextProvider>
    </SafeAreaView>
  );
}
