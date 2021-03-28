import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper';
import { LifeLineBlue, LifeLineDarkBlue } from '../../../../types';
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default (props:{places:string[],setSocialPlaces:(places:string[])=>void})=>{
    const {places,setSocialPlaces} = props;
    const [place,setPlace] = useState("");


   // if(props.places.length==0)  return <Text style={{alignSelf:'center', fontSize:20,color:'white'}}>No Acitivites, Add Some Above!</Text>


    const _renderItem = (props:{item:string})=>{
        return (
            <View style={{flexDirection:'row',borderWidth:2, borderColor:'white', borderRadius:30,alignSelf:'stretch'}}>
                <Text style={{color:'white',fontSize:20,margin:3,flex:2}}>{props.item}</Text>
                <TouchableOpacity onPress={()=>{
                    const newPlaces = [...places];
                    const index = newPlaces.indexOf(props.item);
                    newPlaces.splice(index,1);
                    setSocialPlaces([...newPlaces])
                    
            }}><MaterialCommunityIcons size={30} style={{
                color:'red',
                alignSelf:'center',
                flex:1
            }} name='minus'></MaterialCommunityIcons></TouchableOpacity>
            </View>
        )

    }

    const addPlace =()=>{
        if(place.trim()==''){alert("Please enter a place"); return}
        if(props.places.includes(place)){alert("You already have this as a social place"); return}
        props.setSocialPlaces([place,...props.places])
        setPlace('')
    }


    return (
        <View style={{backgroundColor:LifeLineDarkBlue,flex:1}}>
              <TextInput defaultValue={place} style={{marginBottom:10, marginTop:10,color:'white',backgroundColor:LifeLineBlue,textAlign:'center'}} placeholderTextColor='white' placeholder='Enter a place' onChangeText={(text=>setPlace(text))}></TextInput>
              <Button mode='contained' style={{borderRadius:20}} onPress={addPlace} color={LifeLineBlue}>Add Place</Button>
            {props.places.length==0? <Text style={{alignSelf:'center', fontSize:20,color:'white'}}>No Places, Add Some Above!</Text> :<>
          
            <FlatList keyExtractor={(item)=>item} style={{alignSelf:'stretch',borderTopColor:'white',borderWidth:1, marginTop:10}} data={props.places} renderItem={_renderItem}></FlatList></>}
            
        </View>
    )
}