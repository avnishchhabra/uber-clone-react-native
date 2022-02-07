import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectTimeForTravel } from "../redux/slices/navSlice";

const data = [
  {
    id: 1,
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: 2,
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: 3,
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];
const SURGE_CHARGE_RATE = 1.5;
const NavigateOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInfo = useSelector(selectTimeForTravel);
  console.log("travelTimeInfo", travelTimeInfo);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Icon
            name="chevron-left"
            size={18}
            type="font-awesome"
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.headerText}>
            Select a Ride{" "}
            {travelTimeInfo && "- " + travelTimeInfo.distance.text}
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={{
              ...styles.option,
              ...(selected?.id === id && styles.selected),
            }}
          >
            <Image
              source={{ uri: image }}
              resizeMode="contain"
              style={{ height: 100, width: 100 }}
            />
            <View style={{ marginLeft: -20 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>Title</Text>
              <Text>{travelTimeInfo?.duration.text}</Text>
            </View>
            <Text style={{ fontSize: 20 }}>
              {/* Rs.{" "} */}
              {(travelTimeInfo?.duration.value *
                SURGE_CHARGE_RATE *
                multiplier) /
                60}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        disabled={!selected}
        style={{
          ...styles.chooseButton,
          ...(!selected && { backgroundColor: "#D3D3D3" }),
        }}
      >
        <Text style={styles.chooseText}>Choose {selected?.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NavigateOptions;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 25,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -25,
  },
  selected: {
    backgroundColor: "#D3D3D3",
  },
  textContainer: { flex: 0.75 },
  headerText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 22,
  },
  iconContainer: {
    flexDirection: "row",
    alignContent: "center",
    flex: 0.25,
    padding: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  chooseButton: {
    backgroundColor: "black",
    margin: 15,
    padding: 15,
  },
  chooseText: {
    color: "white",
    textAlign: "center",
  },
});
