import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import {
  selectDestination,
  selectOrigin,
  setTimeToTravel,
} from "../redux/slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useEffect, useRef } from "react";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"]);
  }, [origin, destination]);
  useEffect(() => {
    if (!origin || !destination) return;
    fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial
      &origins=${origin.description}
      &destinations=${destination.description}
      &key=${GOOGLE_MAPS_APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => dispatch(setTimeToTravel(data.rows[0].elements[0])));
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);
  return (
    <MapView
      ref={mapRef}
      mapType="mutedStandard"
      //   mutedStandard remvoes unnecessary places from map
      style={styles.map}
      initialRegion={{
        latitude: origin?.location.lat,
        longitude: origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.05,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          strokeWidth={3}
          strokeColor="black"
          origin={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
          }}
          destination={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
