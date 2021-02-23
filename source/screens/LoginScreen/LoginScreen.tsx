import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Screens } from '..';
import { Login, GetUserData } from '../../firebase/auth';
import { User } from '../../interfaces/user';
import styles from './styles';


export default function LoginScreen({navigation}:StackScreenProps<Screens,'Login'>) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading,setLoading] = useState(false);

    const onFooterLinkPress = () => {
        navigation.navigate('Signup')
    }

    const onLoginPress = async () => {
        setLoading(true);
        try {
            const userCredential = await Login(email, password);
            const user = await GetUserData(userCredential) as User;
            navigation.navigate('Home', {user});
        } catch (error) {
            // Do something with error here
            alert(error);
        }finally{
            setLoading(false);
        }
      
    }

    

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

             

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                {loading?<ActivityIndicator color='blue' size='large'></ActivityIndicator>:<></>}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}