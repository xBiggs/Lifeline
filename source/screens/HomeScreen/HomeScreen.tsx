import { StackScreenProps, } from '@react-navigation/stack';
import React from 'react'
import {  Text, View ,Image, TouchableOpacity} from 'react-native'
import { Screens } from '..';
import { Logout } from '../../firebase/auth'
import { User } from '../../interfaces/user';
import styles from './styles';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export default function HomeScreen(props:StackScreenProps<Screens,'Home'>) {
    const user: User = props.route.params.user;
    return (
        <View style={styles.container}>
            <Text style={styles.buttonTitleMain}>Hello {`${user.firstName} ${user.lastName}`}</Text>
            
            
            
            
            <Card borderRadius={15} >
  <Card.Title style={{color:'#FB8500',fontSize:30,}}>Medical Information</Card.Title>
  <Card.Divider/>
  
  <Card.Image style={{resizeMode:'cover',}} source={require('./research.png')}>
  </Card.Image>
    <Text style={{marginBottom: 20,marginTop:40,paddingLeft:20,paddingRight:20,fontSize:20}}>
      Update your personal info for better health tracking and management.
    </Text>
    
    <TouchableOpacity style={styles.button}onPress={async ()=>{props.navigation.navigate('PersonalInfo',{user})}}
     ><Text style={styles.buttonLabel}>Edit Information</Text></TouchableOpacity>

</Card>
<TouchableOpacity style={styles.buttonLogout}
             onPress={async ()=>{await Logout();}}><Text style={styles.buttonLabel}>Logout</Text></TouchableOpacity>
        </View>
        
    )
}