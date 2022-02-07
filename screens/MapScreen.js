import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigate from "../components/Navigate";
import NavigateOptions from "../components/NavigateOptions";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const MapScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.menuIcon}
      >
        <Icon name="menu" size={25} color="black" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Navigate"
            component={Navigate}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="NavigateOptions"
            component={NavigateOptions}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  menuIcon: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 50,
    backgroundColor: "#D3D3D3",
    padding: 15,
    borderRadius: 25,
  },
});
