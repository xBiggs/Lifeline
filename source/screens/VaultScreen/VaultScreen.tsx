import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Audio } from "expo-av";
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
import { HomeDrawerParamList, LifeLineBlue, MediaEntry, VaultStackParamList } from "../../types";
import { Video, AVPlaybackStatus } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import { StackScreenProps } from "@react-navigation/stack";

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
  props: StackScreenProps<VaultStackParamList, "Vault">
) {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const carouselRef = useRef(null);
  const user = props.route.params.user;
  const goForward = () => {};

  props.navigation.addListener('focus',()=>{
    if(user.vaultItems)
    {
      const entries:MediaEntry[] = [];
      if(user.vaultItems.photos) entries.push(...user.vaultItems.photos)
      if(user.vaultItems.videos) entries.push(...user.vaultItems.videos)
      setEntries(entries);
    }
  });

  async function playSound() {
    // console.log("Loading Sound");
    // const { sound } = await Audio.Sound.createAsync(
    //   require("assets/.HereComesTheSun.mp3.icloud")
    // );
    // setSound(sound);
    // console.log("Playing Sound");
    // await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if(user.vaultItems)
    {
      const entries:MediaEntry[] = [];
      if(user.vaultItems.photos) entries.push(...user.vaultItems.photos)
      if(user.vaultItems.videos) entries.push(...user.vaultItems.videos)
      setEntries(entries);
    }
  }, [user.vaultItems?.photos, user.vaultItems?.videos]);

  const renderItem = ({ item, index }, parallaxProps) => {
    // console.log(parallaxProps);
    return (
      <View style={styles.item}>
        {item.type == "image" ? (
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
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.quote}>Welcome</Text>
        <TouchableOpacity
          style={{
            backgroundColor: LifeLineBlue,
            borderRadius: 25,
            alignSelf: "flex-start",
          }}
          onPress={() => {
            props.navigation.navigate("Manage", {
              user: props.route.params.user,
            });
          }}
        >
          <MaterialCommunityIcons
            size={40}
            color="white"
            name="plus"
          ></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        layout={"default"}
      />
      <View style={styles.container}>
        <Text style={styles.description}>
          Now Playing:{"\n"}Here Comes the Sun
        </Text>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "#219ebc",
            width: screenWidth - 60,
            borderRadius: 10,
            elevation: 5,
          }}
          onPress={playSound}
        >
          <Text
            style={{
              fontSize: 40,
              color: "white",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            <MaterialCommunityIcons name="play" color={"white"} size={40} />
          </Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: 20,
    marginRight: 20,
  },
  quote: {
    fontSize: 40,
    alignSelf: "center",
    color: "#219ebc",
    textAlign: "center",
    fontWeight: "bold",

    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
  },
  description: {
    fontSize: 30,
    alignSelf: "center",
    color: "#219ebc",
    textAlign: "left",
    fontWeight: "bold",
    elevation: 20,
    marginRight: 20,
    marginBottom: 25,
    marginTop: -90,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    backgroundColor: "#219ebc",
    borderRadius: 7,
    paddingBottom: 20,

    elevation: 30,
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
