import React from 'react'
import { StyleSheet, Text, View } from "react-native"
import { Button } from 'react-native-paper'
import { LifeLineBlue, LifeLineDarkBlue } from '../../../../types'


export default(props:{setOption:(option:number)=>void})=>{
    return(
        <View style={styles.container}>
            <Button style={styles.button} color='white' onPress={()=>{
                props.setOption(0)
            }}>Modify Social Circle</Button>
            <Button style={styles.button} color='white' onPress={()=>{
                props.setOption(1)
            }}>Add Activites to Social Circle</Button>
            <Button style={styles.button} color='white' onPress={()=>{
                props.setOption(2)
            }}>Add Favorite Social Places</Button>
            <Button style={styles.button} color='white' onPress={()=>{
                props.setOption(3)
            }}>Add Favorite Soical Activities</Button>
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        backgroundColor:LifeLineBlue

    },
    button:{
        backgroundColor:LifeLineDarkBlue,
        color:'white',
        margin:5
    }
})