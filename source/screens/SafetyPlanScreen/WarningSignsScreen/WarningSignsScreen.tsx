import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DrawerScreenProps } from "@react-navigation/drawer";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Guid } from "guid-typescript";
import { SafetyPlanStackParamList } from "../../../types";
import { User } from "../../../interfaces/User";
import {
  WarningSign,
  WarningSignValue,
  MODERATE,
  SEVERE,
} from "../../../interfaces/WarningSign";
import WarningSignCard from "./WarningSignCard";
import { FirebaseController } from "../../../firebase/FirebaseController";
import styles from "../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import styles from "./styles";

interface WarningSignListElement {
  id: string;
  warningSign: WarningSign;
}

export default function WarningSignsScreen(
  props: DrawerScreenProps<SafetyPlanStackParamList, "WarningSigns">
) {
  const user: User = props.route.params.user;

  const [index, setIndex] = useState(0);
  const [text, onChangeText] = React.useState("");

  const populateWarningSigns = () => {
    const list: WarningSignListElement[] = [];
    if (user.warningSigns) {
      user.warningSigns.forEach((sign) => {
        list.push({ id: Guid.create().toString(), warningSign: sign });
      });
    }
    return list;
  };
  const initialWarningSigns: WarningSignListElement[] = populateWarningSigns();

  const [warningSignList, setWarningSignList] = useState(initialWarningSigns);

  useEffect(() => {
    (async () => {
      const warningSigns: WarningSign[] = [];
      warningSignList.forEach((element) =>
        warningSigns.push(element.warningSign)
      );
      user.warningSigns = warningSigns;
      try {
        await FirebaseController.SetUserData(user);
      } catch (e) {
        // Do something with error here
        alert((e as Error).message);
      }
    })();
  }, [warningSignList]);

  const addWarningSign = (): void => {
    if (text.trim().length === 0) {
      alert("Warning sign cannot be empty!");
    } else {
      const newElement: WarningSignListElement = {
        id: Guid.create().toString(),
        warningSign: {
          sign: text.trim(),
          points: (index + 1) as WarningSignValue,
        },
      };
      const newList: WarningSignListElement[] = [
        ...warningSignList,
        newElement,
      ];
      setWarningSignList(newList);
    }
  };

  const removeWarningSign = (id: string): void => {
    const filteredList: WarningSignListElement[] = warningSignList.filter(
      (element) => element.id !== id
    );
    setWarningSignList(filteredList);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={{ padding: 30, backgroundColor: "#219ebc",flex:1 }}>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          multiline={true}
          numberOfLines={4}
          placeholder={"Enter Warning Sign"}
          placeholderTextColor="#e5e5e5"
          underlineColorAndroid="#e5e5e5"
          selectionColor="#e5e5e5"
        />
        <SegmentedControl
          values={[MODERATE, SEVERE]}
          selectedIndex={index}
          onChange={(event) => {
            setIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <TouchableOpacity
          onPress={() => addWarningSign()}
          style={{
            backgroundColor: "#023047",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Add Warning Sign +
          </Text>
        </TouchableOpacity>
        
        <FlatList
          keyExtractor={(item: WarningSignListElement) => item.id}
          data={warningSignList}
          renderItem={(element) => (
            <WarningSignCard
              warningSign={element.item.warningSign}
              onPressTrash={() => removeWarningSign(element.item.id)}
            />
          )}
        />
    </View>
    </KeyboardAwareScrollView>
  );
}
