import { StackScreenProps } from '@react-navigation/stack';
import React, {  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LifeLineBlue, LifeLineDarkBlue, LifeLineOrange, SafetyPlanStackParamList } from '../../types';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from 'react-native-paper';




export default (props: StackScreenProps<SafetyPlanStackParamList, 'Home'>) => {
    const { user } = props.route.params;
    const { navigation } = props;
/*
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('WarningSigns', { user })}><Text style={styles.buttonTitle}>Enter Your Warning Signs</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('CopingStrategies', { user })}><Text style={styles.buttonTitle}>Enter Coping Strategies</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonTitle} onPress={() => {
                navigation.navigate('SocialEngagements', { user })
            }}>Enter Favorite Social Engagements</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={async () => {
                    props.navigation.navigate("EmergencyContact", { user });
                }}
            >
                <Text style={styles.buttonTitle}>People I Can Ask For Help</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                props.navigation.navigate("LocationServices", { user })
            }
            }><Text style={styles.buttonTitle}>Emergency Services</Text></TouchableOpacity>
        </View>
    )*/

    return(
        <View style={{flex:1,backgroundColor:LifeLineDarkBlue}}>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignContent:'center',flex:1,backgroundColor:LifeLineDarkBlue}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('WarningSigns',{user})}}>
                <Card style={styles.menuItem} >
                    <MaterialCommunityIcons style={styles.menuIcon} name='sign-caution'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>Warning Signs</Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('CopingStrategies',{user})}}>
               <Card style={styles.menuItem}>
                    <MaterialCommunityIcons style={styles.menuIcon} name='strategy'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>Coping Strategies</Text>
                </Card>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('SocialEngagements',{user})}}>
                <Card style={styles.menuItem}>
                    <MaterialCommunityIcons style={styles.menuIcon} name='nature-people'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>Social Engagements</Text>
                </Card>
                </TouchableOpacity>

            </View>
           
        

            <View style={{flex:1,borderTopColor:'white',borderTopWidth:3,justifyContent:'space-evenly'}}>
                <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:30}}>Emergency</Text>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('EmergencyContact',{user})}}>
               <Card style={[styles.menuItem,{backgroundColor:LifeLineDarkBlue}]}>
                    <MaterialCommunityIcons style={styles.menuIcon} name='help'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>People I Can Ask For Help</Text>
                </Card>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('LocationServices',{user})}}>
                <Card style={[styles.menuItem,{backgroundColor:LifeLineDarkBlue}]}>
                    <MaterialCommunityIcons style={styles.menuIcon} name='shield-account'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>Emergency Services</Text>
                </Card>
                </TouchableOpacity>
                
                
            </View>


        </View>
    )

}


const styles = StyleSheet.create({
    menuItem:{
       backgroundColor:LifeLineDarkBlue, margin:5,
       borderColor:'white',
       elevation:50,
    },
    menuIcon:{
        alignSelf:'center',
        fontSize:50,
        color:LifeLineBlue,
    },
    menuTitle:{
        fontSize:20,
        color:"white",
        alignSelf:'center',
    }
})