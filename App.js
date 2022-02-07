import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="MapScreen"
              component={MapScreen}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
