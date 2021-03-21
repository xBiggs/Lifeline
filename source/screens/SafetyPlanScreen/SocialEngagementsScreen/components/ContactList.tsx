import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native-paper';
import SocialEngagementContact from '../../../../interfaces/socialEngagementContact';
import { LifeLineBlue } from '../../../../types';

export default (props:{addSocialContact:(contact:SocialEngagementContact)=>void})=>{
    const [contacts,setContacts] = useState<Contacts.Contact[]>();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
            });
            setContacts(data)
            setLoading(false)
          }
        })();
      }, []);

      if(loading) return <ActivityIndicator size='large' color='white' style={{
          alignSelf:'stretch'
      }}></ActivityIndicator>

      if(contacts?.length==0) return <Text style={{alignSelf:'center', fontSize:20,color:'white'}}>No Contacts found on Device</Text>



    return (
        <>
        <Text style={{alignSelf:'center', fontSize:20,color:LifeLineBlue}}>Contact List</Text>
        <FlatList style={{margin:5}} data={contacts} renderItem={({item})=><_renderItem item={item} addSocialContact={props.addSocialContact}></_renderItem>}>
        </FlatList>
        </>
    )

}

const _renderItem = (props:{item:Contacts.Contact,addSocialContact:(contact:SocialEngagementContact)=>void})=>{
    const fullname =`${props.item.firstName?props.item.firstName:''} ${props.item.lastName?props.item.lastName:''}`;
    return (
        <View style={{flexDirection:'row',borderWidth:1,borderColor:'white'}}>
            <Text style={{flex:1,color:'white',fontSize:20}}>{fullname}</Text>
            <TouchableOpacity onPress={()=>{
                props.addSocialContact({contact:props.item, engagements:[], id:props.item.id}as SocialEngagementContact)
                
            }}><MaterialCommunityIcons size={30} style={{
                color:'green',
                alignSelf:'center'
            }} name='plus'></MaterialCommunityIcons></TouchableOpacity>

        </View>
    )
}
