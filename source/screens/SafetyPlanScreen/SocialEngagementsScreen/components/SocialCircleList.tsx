import React, {  } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import SocialEngagementContact from '../../../../interfaces/socialEngagementContact';
import { LifeLineDarkBlue } from '../../../../types';

export default (props:{socialContacts:SocialEngagementContact[],removeSocialContact:(contact:SocialEngagementContact)=>void})=>{
    if(props.socialContacts.length == 0) return <Text style={{alignSelf:'center', fontSize:20,color:'white'}}>No Contacts in Social Circle</Text>
    else
    return (
        <>
        <Text style={{alignSelf:'center', fontSize:20,color:LifeLineDarkBlue}}>Social Circle</Text>
        <FlatList keyExtractor={(item)=>item.contact.id} style={{margin:5}} data={props.socialContacts} renderItem={({item})=><_renderItem item={item} removeSocialContact={props.removeSocialContact}></_renderItem>}>
        </FlatList>
        </>
    )

}

const _renderItem = (props:{item:SocialEngagementContact,removeSocialContact:(contact:SocialEngagementContact)=>void})=>{
    const fullname =`${props.item.contact.firstName?props.item.contact.firstName:''} ${props.item.contact.lastName?props.item.contact.lastName:''}`;
    return (
        <View style={{flexDirection:'row',borderWidth:1,borderColor:'white'}}>
            <Text style={{flex:1,color:'white',fontSize:20}}>{fullname}</Text>
            <TouchableOpacity onPress={()=>{
                props.removeSocialContact(props.item)

            }}><MaterialCommunityIcons size={30} style={{
                color:'red',
                alignSelf:'center'
            }} name='minus'></MaterialCommunityIcons></TouchableOpacity>

        </View>
    )
}
