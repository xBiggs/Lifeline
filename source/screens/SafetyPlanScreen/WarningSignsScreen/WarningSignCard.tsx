import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  WarningSign,
  WarningSignValue,
  MODERATE,
  SEVERE,
} from "../../../interfaces/WarningSign";

interface Props {
  warningSign: WarningSign;
  onPressTrash: () => void;
}

const WarningSignCard: React.FC<Props> = (props) => {
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 6 }}>
          <Text style={styles.title}>{props.warningSign.sign}</Text>
          <Text style={{ color: "white" }}>
            {props.warningSign.points == WarningSignValue.MODERATE_VALUE
              ? MODERATE
              : SEVERE}
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <TouchableOpacity onPress={props.onPressTrash}>
            <FontAwesomeIcon size={30} icon={faTrash}></FontAwesomeIcon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#FB8500",
    padding: 20,
    marginVertical: 8,
    borderRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: "white",
  },
});

export default WarningSignCard;
