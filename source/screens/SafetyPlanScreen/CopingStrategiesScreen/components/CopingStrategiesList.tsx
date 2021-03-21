import React from 'react'
import { FlatList,Pressable,StyleSheet,Text, View,TouchableOpacity } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'


export default (props:{strategies:string[],removeStrategy:(strategy:string)=>void})=>
{
    return (
        <FlatList style={{margin:5}} data={props.strategies} renderItem={({item})=><_renderItem removeStrategy={props.removeStrategy} item={item}></_renderItem>} keyExtractor={(item)=>item}>
        </FlatList>
    )

}

const _renderItem = (props:{item:string,removeStrategy:(strategy:string)=>void})=>{
    return (
        <View style={{flexDirection:'row',borderWidth:1}}>
            <Text style={[styles.buttonTitle,{flex:1}]}>{props.item}</Text>
            <TouchableOpacity onPress={()=>{
                props.removeStrategy(props.item);
            }}><MaterialCommunityIcons size={30} style={{
                color:'red',
                alignSelf:'center'
            }} name='minus'></MaterialCommunityIcons></TouchableOpacity>

        </View>
    )
}

const styles= StyleSheet.create({
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    }
})
