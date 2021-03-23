import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import { Video, AVPlaybackStatus } from "expo-av";

// Pull info from firebase
const ENTRIES1 = [
  {
    title: "Beautiful and dramatic Antelope Canyon",

    url: "https://i.imgur.com/UYiroysl.jpg",
    type: "photo",
  },
  {
    title: "Earlier this morning, NYC",

    url: "https://i.imgur.com/UPrs1EWl.jpg",
    type: "photo",
  },
  {
    title: "White Pocket Sunset",

    url: "https://i.imgur.com/MABUbpDl.jpg",
    type: "photo",
  },
  {
    title: "Acrocorinth, Greece",

    url: "https://i.imgur.com/KZsmUi2l.jpg",
    type: "photo",
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",

    url: "https://i.imgur.com/2nCt3Sbl.jpg",
    type: "photo",
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",

    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    type: "video",
  },
];
const { width: screenWidth } = Dimensions.get("window");

export default function Vault(
  props: DrawerScreenProps<HomeDrawerParamList, "Vault">
) {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const user = props.route.params.user;
  const goForward = () => {};

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        {item.type == "photo" ? (
          <ParallaxImage
            source={{ uri: item.url }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        ) : (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: item.url,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#219ebc",
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: screenWidth - 133,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
