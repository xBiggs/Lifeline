import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import * as icons from '@fortawesome/free-solid-svg-icons'
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View,Text, Button, Keyboard } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SetUserData } from '../../../firebase/auth';
import { AddUserData } from '../../../firebase/UserDataHandler';
import { SafetyPlanStackParamList } from '../../../types';


export default (props:StackScreenProps<SafetyPlanStackParamList,'CopingStrategies'>)=>
{
    const {user} = props.route.params
    user.copingStrategies?null:user.copingStrategies=[]
    const {navigation} = props
    const [strat,setStrat] = useState('');
    const [strats,setStrats]= useState<string[]>(user.copingStrategies);

    const updateUser = async()=>
    {
        await AddUserData(user)
    }

    useEffect(()=>{
        console.log('updating')
        user.copingStrategies = strats
        updateUser()
    },[strats])

    

    return (
        <>
            <View style={{}} >
                <TextInput value={strat} placeholder='add' clearTextOnFocus={true} onChangeText={text=>setStrat(text)}></TextInput>
                <Button title='Add' onPress={()=>{
                if(strat=='')
                {
                    alert('Cannot be blank!')
                    return
                }
                if (strats.indexOf(strat) != -1)
                {
                    alert("You already added this strategy!")
                    return;
                }    
                setStrats(prev=>[...prev,strat])
                user.copingStrategies= strats;
                setStrat('')
               // console.log(strats)
                }}></Button>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                {strats.length>0?strats.map(s=>(
                    <View key={s} style={{flexDirection:'row'}}>
                        <Text style={{flex:1, fontSize:15}}>{s}</Text>
                       <TouchableOpacity onPress={()=>{
                           setStrats(prev=>{
                               const newArr = [...prev];
                               newArr.splice(newArr.indexOf(s),1);
                               return newArr
                           })
                       }}><FontAwesomeIcon size={30} icon={icons.faEraser}></FontAwesomeIcon></TouchableOpacity> 
                    </View>
                )):<Text>No Coping Strategies!</Text>}
            </View>
            <View><Button title='Go Back' onPress={()=>{navigation.goBack();}}></Button></View>
        </>
        

    )

}