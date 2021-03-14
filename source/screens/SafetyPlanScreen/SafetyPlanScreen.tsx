import { NavigationProp, useNavigation } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SafetyPlanStackNavigator from '../../navigation/SafetyPlanStackNavigator'
import { SafetyPlanStackParamList } from '../../types'
import styles from './styles'

export default (props:StackScreenProps<SafetyPlanStackParamList,'Home'>)=>
{
    const {user} = props.route.params;
    const {navigation} = props;

    

return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button}><Text style={styles.buttonTitle}>Enter Your Warning Signs</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate('CopingStrategies',{user})}><Text style={styles.buttonTitle}>Enter Coping Strategies</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonTitle} onPress={()=>{ navigation.navigate('SocialEngagements',{user})
                }}>Enter Favorite Social Engagements</Text></TouchableOpacity>
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