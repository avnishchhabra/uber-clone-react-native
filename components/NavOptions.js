import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../redux/slices/navSlice";

const data = [
  {
    id: 1,
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: 2,
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[tw`bg-gray-200 p-4 m-2 rounded-lg `, styles.optioncard]}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
        >
          <View style={tw`${!origin && "opacity-30"}`}>
            <Image style={styles.optionImage} source={{ uri: item.image }} />
            <Text style={tw`text-lg font-bold`}>{item.title}</Text>
            <Icon
              type="antdesign"
              name="arrowright"
              color="white"
              style={tw`bg-black rounded-full p-2 w-10 mt-2`}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  optionImage: {
    height: 120,
    width: 120,
    resizeMode: "contain",
  },
});
