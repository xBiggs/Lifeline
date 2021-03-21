import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import SocialEngagementContact from '../../../../interfaces/socialEngagementContact'
import { LifeLineBlue, LifeLineDarkBlue } from '../../../../types'
import ContactList from './ContactList'
import SocialCircleList from './SocialCircleList'


export default(props:{socialContacts:SocialEngagementContact[],addSocialContact:(contact:SocialEngagementContact)=>void , removeSocialContact:(contact:SocialEngagementContact)=>void})=>{


    return (
        <View style={styles.container}>
           <View style={styles.contacts}>
               <ContactList addSocialContact={props.addSocialContact}></ContactList>
           </View>
           <View style={styles.socialCircle}>
               <SocialCircleList removeSocialContact={props.removeSocialContact} socialContacts={props.socialContacts}></SocialCircleList>
               </View>           
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        margin:5,
        flexDirection:'row',
        flex:1,
        justifyContent:'space-around'
    },
    contacts:{
        backgroundColor:LifeLineDarkBlue,
        borderWidth:1,
       flex:1
    },
    socialCircle:{
        backgroundColor:LifeLineBlue,
        borderWidth:1,
        flex:1
    }
})