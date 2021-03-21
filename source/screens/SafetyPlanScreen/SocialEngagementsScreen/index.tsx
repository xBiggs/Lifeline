import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts'
import { TouchableOpacity, StyleSheet, Text, View, Modal, Pressable, Keyboard } from 'react-native'
import { SafetyPlanStackParamList } from '../../../types'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import SocialEngagementContact from '../../../interfaces/socialEngagementContact'
import { AddUserData } from '../../../firebase/UserDataHandler'
import SocialEngagement from '../../../interfaces/socialEngagements'




export default (props:StackScreenProps<SafetyPlanStackParamList,'SocialEngagements'>) => {

    // TODO: Not ssure why you use variables like object here
    const {user} = props.route.params;
    user.socialEngagements?null:user.socialEngagements = {
        activites:[],
        socialContacts:[],
        places:[]
    }
    const [places,setPlaces]=useState(user.socialEngagements.places);
    const [placeText,setPlaceText] = useState('')
    // TODO: Variable never used
    const [activityText,setActivityText] = useState('');
    const [socialContacts,setSocialContacts] = useState(user.socialEngagements.socialContacts);
    const [view,setView] = useState(0)

    useEffect(()=>{
        console.log('updating')
        AddUserData(user)
    },[socialContacts])


    const AddFriendsContent = ()=>{
        return (
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <View>
                <Text>Your Contacts</Text>
                <ContactList ></ContactList>
            </View>
            <View style={{alignSelf:'flex-end'}}>
                <Text style={{alignSelf:'center'}}>Your Social Circle</Text>
                <SocialCircle></SocialCircle>
            </View>
        </View>);
}

const SocialCircle = () =>{
    useEffect(()=>{
        user.socialEngagements?user.socialEngagements.socialContacts = socialContacts:null;
    },[socialContacts]);

    return (
        <>
        {socialContacts.length==0?<Text>No Contacts in Social Circle</Text>:
        <FlatList data={socialContacts}
        renderItem={({item,index})=>{
            return ( <View key={item.id} style={{flexDirection:'row',backgroundColor:index%2==0?'grey':'white'}}>
            <Text style={{flex:2}}>{`${item.contact.firstName?item.contact.firstName:''} ${item.contact.lastName?item.contact.lastName:''}`}</Text>
            <TouchableOpacity  onPress={()=>{
                console.log(index);
                // TODO: prev is never used
                setSocialContacts( prev => {
                   socialContacts.splice(index,1)
                   return [...socialContacts]
               });
            }
            }><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></TouchableOpacity>
        </View>)
        }}
        >
        </FlatList>}
        </>
    )
}

const ContactList =()=>{
    const [contacts,setContacts] = useState<Contacts.Contact[]>();
    useEffect(() => {
        (async () => {
            // TODO: Try Catch ?
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
         <FlatList data={contacts}
         renderItem={({item,index})=>{
             return (<View key={item.id} style={{flexDirection:'row',backgroundColor:index%2==0?'grey':'white'}}>
             <Text style={{flex:2}}>{`${item.firstName?item.firstName:''} ${item.lastName?item.lastName:''}`}</Text>
             <TouchableOpacity onPress={()=>{
                 let error = false
                 socialContacts.forEach(c=>{
                     if(c.id == item.id){error = true; return}
                 })
                 if(error){
                     alert('you already added this contact to your circle')
                    }
                    else{
                        setSocialContacts([{id:item.id,contact:item,engagements:[]},...socialContacts])
                    }
             }
             }><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></TouchableOpacity>
         </View>)
         }}
         >

         </FlatList>
        </>
      );
}

const AddFriendActivitiesContent = () =>{
    return (
        <>
        {socialContacts.length==0?<Text>No Contacts in Social Circle</Text>:
        <FlatList
        keyboardShouldPersistTaps='handled' data={socialContacts}
        renderItem={({item,index})=>{
            return(
                <ContactActivity contact={item} index={index} ></ContactActivity>
            )
        }}
          >
            </FlatList>}
        </>
    )
}

const ContactActivity = (props:{contact:SocialEngagementContact,index:number})=>
{

const {contact} = props.contact
const {index} = props
const [text,setText] = useState('')
const [modalVisible, setModalVisible] = useState(false);


   return (
       <View style={{justifyContent:'space-around',backgroundColor:index%2==0?'grey':'white'}} >
       <View>
           <Text>{contact.firstName}</Text>
           <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput placeholder={`Enter activity to do with ${contact.firstName}`} onChangeText={(text)=>{
                setText(text)
            }}></TextInput>
            <Pressable style={styles.button}
            onPress={()=>{
                if(text.trim()=='') {
                    alert('Cannot add blank activity')
                    return
                }
                if(props.contact.engagements.includes(text))
                {
                    alert(`You already have this activity with ${contact.firstName}`)
                    return
                }else
                {
                    props.contact.engagements.push(text)
                    setSocialContacts([...socialContacts])
                }
            }}
            ><Text>Add</Text></Pressable>
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
        <Text style={styles.textStyle}>Add Activity</Text>
      </Pressable>
    </View>

       </View>
       <View>{props.contact.engagements.map(e=>{
               return <Text key={e}>{e}</Text>
           })}</View>
       </View>
   )
}


const AddSocialPlacesContent = () => {
    return(
        <View style={{flex:2,flexDirection:'row'}}>
        <TextInput style={{flex:1,alignSelf:'center',borderColor:'black',borderWidth:1,justifyContent:'space-around'}} onChangeText={text=>{setPlaceText(text)}} placeholder='Add a Place'></TextInput>
            <Pressable style={[styles.buttonOpen,{justifyContent:'space-evenly'}]} onPress={()=>{
                if(placeText.trim()==''){
                    alert('Cannot add empty place')
                    return
                }
                if(places.includes(placeText))
                {
                    alert('You already added this place')
                    return
                }
                setPlaces([placeText,...places])
            }}><Text>Add Place</Text></Pressable>
        </View>
    )
}

const AddSocialActivitiesContent = () => {
    return (
        <View>
            <Text>
                Social Activities content
            </Text>
        </View>
    )
}

let ViewContent: JSX.Element;
switch(view)
{
    case 1:
        {
            ViewContent = AddFriendsContent();
            break;
        }
    case 2:
        {
            ViewContent = AddFriendActivitiesContent();
            break;
        }
    case 3:
        {
            ViewContent = AddSocialPlacesContent()
            break;
        }
    case 4:
        {
            ViewContent = AddSocialActivitiesContent();
            break;
        }
    default:
        {
            ViewContent=HomeContent();
        }
}


return(
    <>
       <View style={{flex:2,}}>
           {ViewContent}
       </View>

        <View style={{flex:1, backgroundColor:'orange',justifyContent:'space-between',marginBottom:10}}>
            <Text style={{alignSelf:'center'}}>What would you like to do?</Text>
            <TouchableOpacity onPress={()=>{setView(1)}} style={[styles.button,{}]}><Text style={styles.buttonTitle}>Add Friends to Social Circle</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setView(2)}} style={[styles.button,{alignSelf:'stretch',}]}><Text style={styles.buttonTitle}>Add Activities to Do With Friends</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setView(3)}} style={styles.button}><Text style={styles.buttonTitle}>Add Social Places</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setView(4)}} style={styles.button}><Text style={styles.buttonTitle}>Add Social Activities</Text></TouchableOpacity>
        </View>
    </>
)


}


const HomeContent = () =>{
    return ( <View>
         <Text>Select below!</Text>
     </View>)
 }

const styles = StyleSheet.create({
    buttonTitle:{
        color:'white',
        alignSelf:'center'

    },
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
        backgroundColor: "#F194FF",
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
    
})