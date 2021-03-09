import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { User } from '../../interfaces/User'
import { SafetyPlanDrawer, HomeDrawerParamList } from '../../types'
import styles from './styles'


// export default () => 
export default ( props: DrawerScreenProps<SafetyPlanDrawer, "Home">)=>
{
    const user: User = props.route.params.user;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonTitle}>Enter Your Warning Signs</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonTitle}>Enter Coping Strategies</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonTitle}>Enter Favorite Social Activites</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={async () => {
                props.navigation.navigate("EmergencyContact", { user });
            }}
            >
                <Text style={styles.buttonTitle}>People I Can Ask For Help</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonTitle}>Emergency Services</Text></TouchableOpacity>
        </View>
    )

}