import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { DrawerScreenProps } from '@react-navigation/drawer';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { SafetyPlanStackParamList } from "../../../types";
import { User } from '../../../interfaces/User';
import { WarningSign, WarningSignValue , MODERATE, SEVERE } from "../../../interfaces/WarningSign";
import WarningSignCard from "./WarningSignCard";
// import styles from "./styles";

interface WarningSignListElement {
  id: string,
  warningSign: WarningSign
}

export default function WarningSignsScreen(props: DrawerScreenProps<SafetyPlanStackParamList, "WarningSigns">) {
  const user: User = props.route.params.user;
  const [index, setIndex] = useState(0);
  const [text, onChangeText] = React.useState("");
  const [id, setId] = useState(0);
  const populateWarningSigns = () => {
    const list: WarningSignListElement[] = [];
    if (user.warningSigns) {
      user.warningSigns.forEach(sign => {
        list.push({id: id.toString(), warningSign: sign});
        setId(id+1);
      });
    }
    return list;
  }
  const initialWarningSigns: WarningSignListElement[] = populateWarningSigns();
  const [warningSignList, setWarningSignList] = useState(initialWarningSigns);

  const addWarningSign = (): void => {
    const newElement: WarningSignListElement = {
      id: id.toString(),
      warningSign: {
        sign: text,
        points: index+1 as WarningSignValue
      }
    }
    setId(id+1);
    const newList: WarningSignListElement[] = [...warningSignList , newElement];
    setWarningSignList(newList);
    // const warningSigns: WarningSign[] = [];
    // newList.forEach(element => warningSigns.push(element.warningSign));
    // user.warningSigns = warningSigns;
  }

  const removeWarningSign = (id: string): void => {
    const filteredList: WarningSignListElement[] = warningSignList.filter(element => element.id !== id);
    setWarningSignList(filteredList);
    // const warningSigns: WarningSign[] = [];
    // filteredList.forEach(element => warningSigns.push(element.warningSign))
    // user.warningSigns = warningSigns;
  }

  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        multiline={true}
        numberOfLines={4}
      />
      <SegmentedControl
        values={[MODERATE, SEVERE]}
        selectedIndex={index}
        onChange={(event) => {
          setIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <TouchableOpacity onPress={() => addWarningSign()}>
        <Text>Add Warning Sign</Text>
      </TouchableOpacity>
      <FlatList
            keyExtractor = { (item: WarningSignListElement) => item.id}
            data={warningSignList}
            renderItem = {element => (<WarningSignCard warningSign={element.item.warningSign} onPressTrash={() => removeWarningSign(element.item.id)}/>)}
             />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     width: '100%',
//     borderWidth: 1
//   },
// });