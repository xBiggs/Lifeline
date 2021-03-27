import React from "react"
import { View,Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { LifeLineBlue, LifeLineDarkBlue } from "../../../types";
import { TouchableOpacity } from "react-native-gesture-handler";


export default (props:{setOption:(option:number)=>void})=>{
    return (
        <View>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity onPress={()=>{props.setOption(0)}}>
                <Card style={styles.menuItem} >
                    <MaterialCommunityIcons style={styles.menuIcon} name='camera'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>Add Photo/Video</Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.setOption(1)}}>
               <Card style={styles.menuItem}>
                    <MaterialCommunityIcons style={styles.menuIcon} name='format-quote-open'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>Add Quote</Text>
                </Card>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{props.setOption(2)}}>
                <Card style={styles.menuItem}>
                    <MaterialCommunityIcons style={styles.menuIcon} name='music'></MaterialCommunityIcons>
                    <Text style={styles.menuTitle}>Add Audio</Text>
                </Card>

                </TouchableOpacity>
              
            </View>
            <View></View>
        </View>
    )

}

const styles=StyleSheet.create({
    menuItem:{
        backgroundColor:LifeLineDarkBlue
    },
    menuIcon:{
        alignSelf:'center',
        fontSize:50,
        color:LifeLineBlue

    },
    menuTitle:{
        fontSize:15,
        color:LifeLineBlue
    }
})