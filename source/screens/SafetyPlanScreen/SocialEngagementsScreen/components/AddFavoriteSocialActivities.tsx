import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper';
import { LifeLineBlue, LifeLineDarkBlue } from '../../../../types';
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default (props:{activities:string[],setSocialActivities:(activities:string[])=>void})=>{
    const {activities,setSocialActivities} = props;
    const [activity,setActivity] = useState("");


   // if(props.activities.length==0)  return <Text style={{alignSelf:'center', fontSize:20,color:'white'}}>No Acitivites, Add Some Above!</Text>


    const _renderItem = (props:{item:string})=>{
        return (
            <View style={{flexDirection:'row',borderWidth:2, borderColor:'white', borderRadius:30,alignSelf:'stretch'}}>
                <Text style={{color:'white',fontSize:20,margin:3,flex:2}}>{props.item}</Text>
                <TouchableOpacity onPress={()=>{
                    const newActivities = [...activities];
                    const index = newActivities.indexOf(props.item);
                    newActivities.splice(index,1);
                    setSocialActivities([...newActivities])
                    
            }}><MaterialCommunityIcons size={30} style={{
                color:'red',
                alignSelf:'center',
                flex:1
            }} name='minus'></MaterialCommunityIcons></TouchableOpacity>
            </View>
        )

    }

    const addPlace =()=>{
        if(activity.trim()==''){alert("Please enter an activity"); return}
        if(props.activities.includes(activity)){alert("You already have this as a social activity"); return}
        setSocialActivities([activity,...props.activities])
        setActivity('')
    }


    return (
        <View style={{backgroundColor:LifeLineDarkBlue,flex:1}}>
              <TextInput defaultValue={activity} style={{marginBottom:10, marginTop:10,color:'white',backgroundColor:LifeLineBlue,textAlign:'center'}} placeholderTextColor='white' placeholder='Enter an activity' onChangeText={(text=>setActivity(text))}></TextInput>
              <Button mode='contained' style={{borderRadius:20}} onPress={addPlace} color={LifeLineBlue}>Add Activity</Button>
            {props.activities.length==0? <Text style={{alignSelf:'center', fontSize:20,color:'white'}}>No Activities, Add Some Above!</Text> :<>
          
            <FlatList keyExtractor={(item)=>item} style={{alignSelf:'stretch',borderTopColor:'white',borderWidth:1, marginTop:10}} data={props.activities} renderItem={_renderItem}></FlatList></>}
            
        </View>
    )
}