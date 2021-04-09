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
import {
  HomeDrawerParamList,
  LifeLineBlue,
  MediaEntry,
  VaultStackParamList,
} from "../../types";
import { Video, AVPlaybackStatus } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";

// Pull info from firebase
const ENTRIES1 = [];
const { width: screenWidth } = Dimensions.get("window");

export default function Vault(
  props: StackScreenProps<VaultStackParamList, "Vault">
) {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [soundEntries, setSoundEntries] = useState<String[]>([]);
  const [playStatus, setPlayStatus] = useState("play");
  const [playIndex, setPlayIndex] = useState(0);
  const carouselRef = useRef(null);
  const user = props.route.params.user;
  const goForward = () => {};

  props.navigation.addListener("focus", () => {
    if (user.vaultItems) {
      const entries: MediaEntry[] = [];
      if (user.vaultItems.photos) entries.push(...user.vaultItems.photos);
      if (user.vaultItems.videos) entries.push(...user.vaultItems.videos);
      setEntries(entries);
      let audioEntries: String[] = [];
      user.vaultItems.audio.forEach((item) => {
        if (item.url) audioEntries.push(item.url);
      });
      if (audioEntries) setSoundEntries(audioEntries);
    }
  });

  async function nextSound() {
    if (playIndex + 1 >= soundEntries.length) {
      await setPlayIndex(0);
    } else await setPlayIndex(playIndex + 1);
    sound?.stopAsync();
    setPlayStatus("play");
  }

  async function previousSound() {
    if (playIndex > 0) {
      await setPlayIndex(playIndex - 1);
    } else {
      await setPlayIndex(soundEntries.length - 1);
    }
    sound?.stopAsync();
    setPlayStatus("play");
  }
  async function playSound() {
    if (playStatus == "play") {
      setPlayStatus("stop");

      const { sound } = await Audio.Sound.createAsync({
        uri: soundEntries[playIndex].toString(),
      });
      await setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      setPlayStatus("play");
      sound?.stopAsync();
    }
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
    if (user.vaultItems) {
      const entries: MediaEntry[] = [];
      if (user.vaultItems.photos) entries.push(...user.vaultItems.photos);
      if (user.vaultItems.videos) entries.push(...user.vaultItems.videos);
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
    <ScrollView>
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
            Now Playing:{"\n"} {user.vaultItems?.audio[playIndex].title}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 50 }}>
            <TouchableOpacity
              style={{
                width: screenWidth / 5,
                marginRight: 30,
                alignSelf: "center",
                backgroundColor: "#219ebc",

                borderRadius: 10,
                elevation: 5,
              }}
              onPress={previousSound}
            >
              <Text
                style={{
                  fontSize: 40,
                  color: "white",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={"white"}
                  size={40}
                />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: screenWidth / 5,
                alignSelf: "center",
                backgroundColor: "#219ebc",

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
                <MaterialCommunityIcons
                  name={playStatus}
                  color={"white"}
                  size={40}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: screenWidth / 5,
                marginLeft: 30,
                alignSelf: "center",
                backgroundColor: "#219ebc",

                borderRadius: 10,
                elevation: 5,
              }}
              onPress={nextSound}
            >
              <Text
                style={{
                  fontSize: 40,
                  color: "white",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-right"
                  color={"white"}
                  size={40}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 20,
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
