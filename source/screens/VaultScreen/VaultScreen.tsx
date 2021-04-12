import React, { useRef, useState, useEffect, Component } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Audio } from "expo-av";
import Collapsible from "react-native-collapsible";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
  Animated,
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
import { Divider } from "react-native-elements";

// Pull info from firebase
const ENTRIES1 = [];
const { width: screenWidth } = Dimensions.get("window");

export default function Vault(
  props: StackScreenProps<VaultStackParamList, "Vault">
) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: 1000,
    }).start();
  };
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [quoteEntries, setQuoteEntries] = useState<
    { quote: String; author: String }[]
  >();
  const [soundEntries, setSoundEntries] = useState<String[]>([]);
  const [playStatus, setPlayStatus] = useState("play");
  const [playIndex, setPlayIndex] = useState(0);
  const [isMusicVisible, setIsMusicVisible] = useState(true);
  const [isMediaVisible, setIsMediaVisible] = useState(true);
  const [isQuotesVisible, setIsQuotesVisible] = useState(true);
  const [dailyQuote, setDailyQuote] = useState();
  const [dailyAuthor, setDailyAuthor] = useState();

  const carouselRef = useRef(null);

  const user = props.route.params.user;

  props.navigation.addListener("focus", () => {
    if (user.vaultItems) {
      const entries: MediaEntry[] = [];
      if (user.vaultItems.photos) entries.push(...user.vaultItems.photos);
      if (user.vaultItems.videos) entries.push(...user.vaultItems.videos);
      setEntries(entries);
      if (user.vaultItems.quotes) setQuoteEntries(user.vaultItems.quotes);
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
      fetch("https://type.fit/api/quotes")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setDailyQuote(data[0].text);
          setDailyAuthor(data[0].author);
        });
    }
  }, [user.vaultItems?.photos, user.vaultItems?.videos]);

  let quoteEntriesList = [
    {
      quote: "No Quote Added",
      author: "",
    },
  ];
  if (user.vaultItems?.quotes) quoteEntriesList = user.vaultItems.quotes;

  const renderItem = ({ item, index }: any, parallaxProps: any) => {
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
  const renderItemString = ({ item, index }: any, parallaxProps: any) => {
    // console.log(parallaxProps);
    return (
      <View
        style={{
          marginBottom: 60,
          marginTop: 30,
          padding: 15,
          backgroundColor: "#219ebc",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 40, textAlign: "center" }}>
          {item.quote}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "right",
            marginTop: 10,
          }}
        >
          - {item.author}
        </Text>
      </View>
    );
  };
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.quote}>Welcome</Text>
        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: LifeLineBlue,
              borderRadius: 25,
              alignSelf: "flex-start",
              marginTop: 10,
            }}
            onPress={() => {
              //
            setIsMediaVisible(false)
            setIsMusicVisible(false)
            setIsQuotesVisible(false)


              props.navigation.navigate("Manage", {
                user: props.route.params.user,
              });
            }}
          >
            <MaterialCommunityIcons
              size={40}
              style={{ padding: 10 }}
              color="white"
              name="plus"
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: LifeLineBlue,
              borderRadius: 25,
              alignSelf: "flex-start",
              marginTop: 10,
              marginLeft: 10,
            }}
            onPress={() => {
              if (user.vaultItems?.audio && user.vaultItems.audio.length > 0) {
                fadeIn();
                if (!isMusicVisible) {
                  fadeIn();
                  setIsMusicVisible(true);
                } else {
                  fadeOut();
                  setIsMusicVisible(false);
                }
              }
            }}
          >
            <MaterialCommunityIcons
              size={40}
              color="white"
              name="music"
              style={{ padding: 10 }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: LifeLineBlue,
              borderRadius: 25,
              alignSelf: "flex-start",
              marginTop: 10,
              marginLeft: 10,
            }}
            onPress={() => {
              if (
                user.vaultItems?.quotes &&
                user.vaultItems.quotes.length > 0
              ) {
                fadeIn();
                if (!isQuotesVisible) {
                  fadeIn();
                  setIsQuotesVisible(true);
                } else {
                  fadeOut();
                  setIsQuotesVisible(false);
                }
              }
            }}
          >
            <MaterialCommunityIcons
              size={40}
              style={{ padding: 10 }}
              color="white"
              name="text"
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: LifeLineBlue,
              borderRadius: 25,
              alignSelf: "flex-start",
              marginTop: 10,
              marginLeft: 10,
            }}
            onPress={() => {
              if (
                (user.vaultItems?.photos &&
                  user.vaultItems.photos.length > 0) ||
                (user.vaultItems?.videos && user.vaultItems.videos.length > 0)
              ) {
                fadeIn();
                if (!isMediaVisible) {
                  setIsMediaVisible(true);
                } else {
                  fadeOut();
                  setIsMediaVisible(false);
                }
              }
            }}
          >
            <MaterialCommunityIcons
              size={40}
              color="white"
              name="camera"
              style={{ padding: 10 }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <Collapsible
          collapsed={!isMusicVisible || !isMediaVisible || !isQuotesVisible}
        >
          <View
            style={{
              marginBottom: 60,
              marginTop: 30,
              padding: 15,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{ color: "#219ebc", fontSize: 40, textAlign: "center" }}
            >
              Daily Quote:
            </Text>
            <Divider
              style={{
                height: 1,
                marginTop: 10,
                backgroundColor: "#219ebc",
                marginBottom: 10,
                width: screenWidth - 40,
              }}
            ></Divider>
            <Text
              style={{ color: "#219ebc", fontSize: 40, textAlign: "center" }}
            >
              {dailyQuote}
            </Text>
            <Text
              style={{
                color: "#219ebc",
                fontSize: 20,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              - {dailyAuthor}
            </Text>
          </View>
        </Collapsible>

        <Collapsible
          collapsed={isMusicVisible}
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Divider
            style={{
              height: 5,
              marginTop: 20,
              backgroundColor: "#219ebc",
              marginBottom: 20,
              width: screenWidth - 65,
            }}
          ></Divider>
          <Text
            style={{
              fontSize: 30,
              alignSelf: "center",
              color: "#219ebc",
              textAlign: "left",
              fontWeight: "bold",
              elevation: 20,
              marginRight: 0,
              marginBottom: 25,
              marginTop: 0,
            }}
          >
            Now Playing:
            {user.vaultItems?.audio[playIndex]
              ? user.vaultItems?.audio[playIndex].title
              : "No Songs Uploaded"}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
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
          <Divider
            style={{
              height: 5,
              marginTop: 0,
              backgroundColor: "#219ebc",
              marginBottom: 20,
              width: screenWidth - 65,
            }}
          ></Divider>
        </Collapsible>
        <Collapsible collapsed={isMediaVisible}>
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
        </Collapsible>
        <Collapsible collapsed={isQuotesVisible}>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={20}
            itemWidth={screenWidth - 60}
            itemHeight={20}
            data={quoteEntriesList}
            renderItem={renderItemString}
            layout={"default"}
          />
        </Collapsible>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 30,
    alignSelf: "center",
    color: "#219ebc",
    textAlign: "left",
    fontWeight: "bold",
    elevation: 20,
    marginRight: 0,
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
