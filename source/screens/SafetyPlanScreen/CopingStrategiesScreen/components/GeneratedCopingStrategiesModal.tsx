import React, { useState } from "react";
import { Modal, Pressable, View, StyleSheet,Text } from "react-native"
import { Button } from "react-native-paper";
import GeneratedCopingStrategiesList from "./GeneratedCopingStrategiesList";


export default (props:{addStrategy:(strategy:string)=>void})=>{
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.button}>
      <Modal
        animationType="fade"
        presentationStyle='fullScreen'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <GeneratedCopingStrategiesList addStrategy={props.addStrategy}></GeneratedCopingStrategiesList>
          </View>
        </View>
        <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
      </Modal>
      <Button
        style={{}}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Common Coping Strategies</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      marginTop: 50,
    },
    modalView: {
      backgroundColor: "orange",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      backgroundColor: '#FB8500',
      borderRadius: 10,
      alignItems: "center",
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      marginTop:3,
      backgroundColor: "red",
      justifyContent:'center',
      height:75,
      margin:5
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});
