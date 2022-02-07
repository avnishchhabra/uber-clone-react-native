import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setOrigin, setDestination } from "../redux/slices/navSlice";
import { useDispatch } from "react-redux";
import NavFavourites from "../components/NavFavourites";
import Navigate from "../components/Navigate";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={[tw`px-5 pt-12`, styles.homeScreen]}>
      <Image
        style={styles.uberLogo}
        source={{ uri: "https://links.papareact.com/gzs" }}
      />

      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        minLength={2}
        styles={{
          container: { flex: 0 },
          textInput: {
            fontSize: 18,
          },
        }}
        placeholder="Where From?"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
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
      <NavOptions />
      <NavFavourites />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    // flex: 1,
  },
  uberLogo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
