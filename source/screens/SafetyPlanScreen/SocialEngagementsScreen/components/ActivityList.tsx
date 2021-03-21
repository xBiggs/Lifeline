import React, {  } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import SocialEngagementContact from '../../../../interfaces/socialEngagementContact';
import { LifeLineDarkBlue } from '../../../../types';

export default (props:{activities:string[],removeActivity:(activity:string)=>void})=>{
    const {removeActivity} = props


    const _renderItem = (props:{item:string})=>{
    
        return (
            <View style={{flexDirection:'row',borderWidth:1,borderColor:'white'}}>
                <Text style={{flex:1,color:'white',fontSize:20}}>{props.item}</Text>
                <TouchableOpacity onPress={()=>{
                    removeActivity(props.item);
                }}><MaterialCommunityIcons size={30} style={{
                    color:'red',
                    alignSelf:'center'
                }} name='minus'></MaterialCommunityIcons></TouchableOpacity>
    
            </View>
        )
    }

    if(props.activities.length == 0) return <Text style={{alignSelf:'center', color:'white',fontSize:30}}>No Activities</Text>
    else
    return (
        <>
        <Text style={{alignSelf:'center', fontSize:20,color:LifeLineDarkBlue}}>Social Circle</Text>
        <FlatList keyExtractor={(item)=>item} style={{margin:5}} data={props.activities} renderItem={({item})=><_renderItem item={item}></_renderItem>}>
        </FlatList>
        </>
    )

}

