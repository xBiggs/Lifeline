import React, { useState } from 'react'
import { View, Text, Modal, Pressable, TextInput, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import SocialEngagementContact from '../../../../interfaces/socialEngagementContact';
import { LifeLineBlue, LifeLineDarkBlue, LifeLineOrange } from '../../../../types';
import ActivityList from './ActivityList'

export default (props: { socialContacts: SocialEngagementContact[],setSocialContacts:(contacts:SocialEngagementContact[])=>void }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const {setSocialContacts} = props;
    const {socialContacts} = props;
    const [update,setUpdate] = useState(true);

    const removeActivity = (activity:string) =>{
        const index = props.socialContacts[currentIndex].engagements.indexOf(activity)
        props.socialContacts[currentIndex].engagements.splice(index,1);
        props.setSocialContacts([...props.socialContacts])
    }
    
const EngagementModal = (props:{contact:SocialEngagementContact})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [text,setText]=useState('');
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}

          onRequestClose={() => {
              
            setModalVisible(!modalVisible);
          }}
        >
             <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={{flexDirection:'row'}}><TextInput onChangeText={text=>setText(text)} style={{flex:2}}  placeholder='enter an activity'></TextInput><Pressable onPress={()=>{
                  console.log('Add pressed')
                  
                  
                 setUpdate(prev=>{
                        if(text.trim() =='') alert('You cannot add an empty activity')
                        else if(props.contact.engagements.indexOf(text)!=-1) alert('You cannot add this acitvity twice')
                        else props.contact.engagements.push(text);
                      return !prev
                  })
                  setSocialContacts([...socialContacts])
                  
              }} style={{backgroundColor:'orange',flex:1}}><Text lineBreakMode='middle' style={{textAlign:'center',color:'white'}}>Add</Text></Pressable></View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Exit</Text>
            </Pressable>
          </View>
        </View>
         
        </Modal>
        <Pressable
          style={{backgroundColor:LifeLineOrange,alignSelf:'center',borderRadius:29}}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{color:'white',fontSize:15}}>Add Activity</Text>
        </Pressable>
      </View>
    );
  
}

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: LifeLineBlue }}>
                <Text style={{alignSelf:'center', color:'white',fontSize:20}}>Select a Friend from Social Circle</Text>
                <Picker
                    selectedValue={props.socialContacts[currentIndex]}
                    mode='dialog'
                    style={{ borderWidth: 2, height: 20 }}
                    onValueChange={(itemValue, itemIndex) => { setCurrentIndex(itemIndex) }}
                    prompt='Select A Friend'>
                    {props.socialContacts.map(socialContact => {
                        const fullname = `${socialContact.contact.firstName ? socialContact.contact.firstName : ''} ${socialContact.contact.lastName ? socialContact.contact.lastName : ''}`;
                        return (<Picker.Item key={socialContact.id} label={fullname}></Picker.Item>)
                    })}
                </Picker>

            </View>
            <View style={{ backgroundColor: LifeLineDarkBlue, flex: 1 }}>
           
            <EngagementModal contact={props.socialContacts[currentIndex]}></EngagementModal>
            <Text style={{alignSelf:'center', color:'white',fontSize:20}}>{`Activities with ${props.socialContacts[currentIndex].contact.firstName}`}</Text>
            <ActivityList removeActivity={removeActivity} activities={props.socialContacts[currentIndex].engagements}></ActivityList>


            </View>
        </View>
    )
    return (
        <View>


            <Text>{props.socialContacts[currentIndex].contact.firstName}</Text>

        </View>
    )
}



const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      width:300,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "blue",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  