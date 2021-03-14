import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { Alert } from "react-native"
import { View,Text, Modal, StyleSheet, TouchableOpacity,Pressable } from "react-native"
import { SafetyPlanStackParamList } from "../../../types"
import * as Contacts from 'expo-contacts'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import UserStackNavigator from "../../../navigation/UserStackNavigator"
import SocialEngagementContact from "../../../interfaces/socialEngagementContact"
import { User } from "../../../interfaces/User"
import SocialEngagement from "../../../interfaces/socialEngagements"
import PersonalInfoScreen from "../../PersonalInfoScreen/PersonalInfoScreen"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { AddUserData } from "../../../firebase/UserDataHandler"
/** SCREEN USED TO IDENTIFY  FRIENDS TO REACH OUT TO, FAVORITE COFEE SHOPS OR PARKS, AND SOCIAL EVENTS
 * 
 */

export default (props:StackScreenProps<SafetyPlanStackParamList,'SocialEngagements'>)=>
{
    const {user} = props.route.params;
    user.socialEngagements?null:user.socialEngagements={
        activites:[],
        places:[],
        socialContacts:[],
    }
    const [socialContacts,setSocialContacts]= useState<SocialEngagementContact[]>(user.socialEngagements.socialContacts);
    const [socialEngagements,setSocialEngagements] = useState<SocialEngagement>(user.socialEngagements);
    const [places,setPlaces] = useState<string[]>();
    const [activities,setActivities]= useState<string[]>();
   
    useEffect(()=>{
        user.socialEngagements = socialEngagements
    },[socialEngagements])
/*   
useEffect(()=>{
    console.log('uploading....')
    user.socialEngagements = socialEngagements;
    AddUserData(user)
    console.log('done')

},[socialEngagements])
*/

    
const ContactView = ()=>{
    const [contacts,setContacts] = useState<Contacts.Contact[]>();

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails],
            });
    
            if (data.length > 0) {
             setContacts(data)
            }
          }
        })();
      }, []);
    
      return (
        <> 
         <Text style={{alignSelf:'center'}}>Your Contacts</Text>
          {
              contacts?contacts.map(contact=>{
                  return (
                    <View key={contact.id} style={{flexDirection:'row'}}>
        <Text style={{flex:2}}>{`${contact.firstName?contact.firstName:''} ${contact.lastName?contact.lastName:''}`}</Text>
        <TouchableOpacity onPress={()=>{
            const newSocialContact:SocialEngagementContact={
                id:contact.id,
                contact,
                engagements:[]
            }
            let error = false
            socialEngagements.socialContacts.forEach(contact =>{
                if(contact.id == newSocialContact.id){
                    alert('You cannot add the same contact')
                    error= true
                    return
                }
            })
            if(error) return
            const newArr = [newSocialContact,...socialEngagements.socialContacts]
            user.socialEngagements?user.socialEngagements.socialContacts=socialContacts:null
            
            setSocialEngagements(prev=>{
                return {...prev,socialContacts:newArr}
            })
        }
        
        
        }><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></TouchableOpacity>

    </View>
    
     
                  )
              }):<Text>No Contacts</Text>
          }
          
        </>
      );

}

const FriendModal = ()=>{
    const [modalVisible, setModalVisible] = useState(false);
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
            <ContactView></ContactView>
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
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Add Friends for Social Engagement</Text>
        </Pressable>
      </View>
    );
  
}
const SocialEngagements = ()=>
{
    useEffect(()=>{
       user.socialEngagements = socialEngagements
    },[socialEngagements])

        return (
            <View>
                <Text style={{alignSelf:'center'}}>Places</Text>
                {
                   socialEngagements.places.length==0?<Text>No Places</Text>: socialEngagements.places.map(place=>(
                        <Text key={socialEngagements.places.indexOf(place)}>place</Text>
                    ))
                }
                <Text style={{alignSelf:'center'}}>People</Text>
                {
                   socialEngagements.socialContacts.length==0?<Text>No Social Contacts</Text>: socialEngagements.socialContacts.map(sContact=>(
                        < View style={{backgroundColor:'orange',margin:4}} key={sContact.id}>
                             <Text style={{alignSelf:'baseline'}} >{`${sContact.contact.firstName?sContact.contact.firstName:''} ${sContact.contact.lastName?sContact.contact.lastName:''}`}</Text>
                        <View  style={{flexDirection:'row'}}>
                        <View style={{flex:1, backgroundColor:'yellow'}}>
                            <Text>Activities</Text>
                            {sContact.engagements.map(engagement=>{
                                console.log(engagement)
                                return (<Text key={engagement}>{engagement}</Text>)
                            })}
                        </View>
                        <EngagementModal {...sContact}></EngagementModal>
                        </View>
                      
                        </View>
                   ))
                        
                }

                <Text style={{alignSelf:'center'}}>Activities</Text>
                {
                   socialEngagements.activites.length==0?<Text>No Activities</Text>: socialEngagements.activites.map(activity=>(
                        <Text key={activity}>{activity}</Text>
                    ))
                }
            </View>
        )

}


const EngagementModal = (contact:SocialEngagementContact)=>{
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
                  
                  setSocialEngagements(prev=>{
                      contact.engagements.push(text);
                      return {...prev}
                  })
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
          style={{backgroundColor:'red'}}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{color:'white'}}>Add Activity</Text>
        </Pressable>
      </View>
    );
  
}


   
    return(
        <>
            <ScrollView style={{flex:4,}}>
                <SocialEngagements></SocialEngagements>
            </ScrollView>
            <View style={{flex:1,}}>
            <FriendModal></FriendModal>
            </View>
        </>
    )
}





const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
  