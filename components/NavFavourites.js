import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    destination: "Shahabad Markanda, Haryana",
  },
  {
    id: "2",
    icon: "briefcase",
    location: "Work",
    destination: "Toronto, Canada",
  },
  //   {
  //     id: "3",
  //     icon: "briefcase",
  //     location: "Work",
  //     destination: "Toronto, Canada",
  //   },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item: { icon, destination, location } }) => (
        <TouchableOpacity style={styles.fav}>
          <Icon
            color="white"
            style={styles.icon}
            name={icon}
            type="ionicon"
            size={22}
          />
          <View style={styles.textContainer}>
            <Text style={styles.locationText}>{location}</Text>
            <Text style={styles.destinationText}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#D3D3D3",
    height: 0.5,
  },
  fav: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  textContainer: { padding: 10 },
  icon: {
    backgroundColor: "#D3D3D3",
    padding: 8,
    borderRadius: 25,
  },
  locationText: {
    fontSize: 17,
    fontWeight: "600",
  },
  destinationText: {
    color: "gray",
  },
});
