import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FirebaseController} from '../../firebase/FirebaseController';
import { User } from '../../interfaces/User';
import { AuthStackParamList } from '../../types';
import styles from './styles';

export default function LoginScreen( {navigation} : StackScreenProps<AuthStackParamList,'Login'> ) : JSX.Element {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading,setLoading] = useState(false);
    const [error,setError]= useState("");

    const onFooterLinkPress = () : void => {
        console.log('footer pressed')
        navigation.navigate('Signup')
    }

    const onLoginPress = async () : Promise<void> => {
        setLoading(true);
        try {
            const userCredential = await FirebaseController.Login(email, password);
            
        } catch (error) {
           const errObj = error as Error;
           if(errObj.message)setError(errObj.message)
           else setError('Login attempt failed, please try again')
           setLoading(false)
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
                {error?<Text style={{alignSelf:'center',textAlign:'center', fontWeight:'bold',color:'white',backgroundColor:'red',fontSize:15}}>{error}</Text>:<></>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                {loading?<ActivityIndicator color='white' size='large'></ActivityIndicator>:<></>}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}