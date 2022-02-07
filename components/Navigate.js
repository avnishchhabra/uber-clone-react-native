import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../redux/slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";

const Navigate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        minLength={2}
        styles={inputContainer}
        placeholder="Where To?"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );
          navigation.navigate("NavigateOptions");
        }}
        returnKeyType={"search"}
        fetchDetails={true}
        debounce={400}
        nearbyPlacesAPI="GooglePlacesSearch"
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
      />
      <NavFavourites />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderTopColor: "#D3D3D3",
          borderTopWidth: 0.5,
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "black",
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 25,
            justifyContent: "space-between",
            alignItems: "center",
            width: 120,
          }}
          onPress={() => navigation.navigate("NavigateOptions")}
        >
          <Icon size={17} name="car" type="font-awesome" color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 17,
              paddingHorizontal: 10,
              fontWeight: "700",
            }}
          >
            Rides
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingVertical: 6,
            paddingHorizontal: 20,
            borderRadius: 35,
            justifyContent: "space-between",
            alignItems: "center",
            width: 100,
          }}
        >
          <Icon name="fast-food-outline" type="ionicon" />
          <Text
            style={{
              color: "black",
              fontSize: 17,
              paddingHorizontal: 10,
              fontWeight: "700",
            }}
          >
            Eats
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Navigate;

const inputContainer = StyleSheet.create({
  container: { padding: 20, flex: 0 },
  textInput: {
    fontSize: 18,
    backgroundColor: "#DDDDDF",
  },
  textInputContainer: {},
});
