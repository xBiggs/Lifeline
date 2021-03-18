import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { AddUserData } from '../../../firebase/UserDataHandler'
import { SafetyPlanStackParamList } from '../../../types'
import CopingStrategiesList from './components/CopingStrategiesList'
import GeneratedCopingStrategiesModal from './components/GeneratedCopingStrategiesModal'


export default ( props:StackScreenProps<SafetyPlanStackParamList,'CopingStrategies'>)=>{
    // get user from previous screen
    const {user} = props.route.params;

    //if user has no coping strategies, make empty list
    user.copingStrategies?null:user.copingStrategies = [];

    //state to hold coping strategies
    const [strategy,setStrategy] = useState('');
    const [copingStrategies,setCopingStrategies] = useState([...user.copingStrategies]);

    //add  and remove functions for strategy
    const addStrategy = (strategy:string) =>{
        if(copingStrategies.indexOf(strategy)!=-1)
        {
            alert(`You cannot add ${strategy} again!`)
            return;
        }else if(strategy.trim() == '')
        {
            alert('Please enter your coping strategy')

        }else
        setCopingStrategies(prev=>[strategy,...prev])
    }

    const removeStrategy = (strategy:string)=>{
        setCopingStrategies(prev=>{
            const newStrategies = [...prev];
            const index = newStrategies.indexOf(strategy)
            newStrategies.splice(index,1);
            return newStrategies;
        })
    }

    //listener to modify user object when coping strategies change (Add or Remove) and update firebase
    useEffect(()=>{
        user.copingStrategies = copingStrategies
        try{
            AddUserData(user)
            //console.log('successful sync')
        }catch{
            alert('Cannot sync changes at the moment, please try again later');
        }
    },[copingStrategies])


    return (
        <View  style={styles.container}>
            <TextInput clearTextOnFocus onChangeText={(text)=>{setStrategy(text)}} placeholder='Enter a Coping Strategy' style={styles.input}></TextInput>
            <View style={{flexDirection:'row',borderWidth:1, alignSelf:'stretch', justifyContent:'space-evenly'}}>
                <Button style={styles.button} onPress={()=>{addStrategy(strategy)}} mode='contained'>Add</Button>
                <GeneratedCopingStrategiesModal addStrategy={addStrategy}></GeneratedCopingStrategiesModal>
            </View>
            <View style={styles.copingStrategiesList}>
                {copingStrategies.length > 0?
                <CopingStrategiesList removeStrategy={removeStrategy} strategies = {copingStrategies}></CopingStrategiesList>:
                <Text style={[styles.buttonTitleMain,{alignSelf:'center'}]}>No Copng Strategies</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addStrategyRow:
    {
        flexDirection:'row'

    },
    copingStrategiesList:
    {
        flex:1,
        justifyContent:'space-between',
        borderColor:'white',
        alignSelf:'stretch',
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        
    },

    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'#219ebc',
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
   input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        width:350,
    },
    button: {
        backgroundColor: '#FB8500',
        borderRadius: 10,
        alignItems: "center",
    },
    buttonLogout: {
        backgroundColor: '#023047',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 20,
        height: 48,
        width:390,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: "bold"
    },
    buttonTitleMain: {
        color: 'white',
        fontSize: 25,
        fontWeight: "bold",
        marginBottom:30,
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    buttonLabel:{
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    view:{
        marginLeft:5,
        marginRight:5,
    }
})