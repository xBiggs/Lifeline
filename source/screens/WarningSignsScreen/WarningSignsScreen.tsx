import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default () => {
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <SegmentedControl
        values={['One', 'Two']}
        selectedIndex={index}
        onChange={(event) => {
          setIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <Text style={styles.text}>
        Selected index: {index}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  },
  text: {
    marginTop: 24
  }
});