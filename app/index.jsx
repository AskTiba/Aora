import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-3xl text-[#fdd700] font-[Poppins-Black]">Aora!</Text>
      <Link href="./home">Go to Home</Link>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
