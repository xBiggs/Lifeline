import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native"
import { ActivityIndicator, Button,  Divider } from 'react-native-paper';
import { LifeLineBlue, LifeLineDarkBlue, LifeLineOrange, MediaEntry, VaultStackParamList } from '../../../types';
import VaultItemsMenu from './VaultItemsMenu';
import { User } from '../../../interfaces/User';
import * as DocumentPicker from 'expo-document-picker';
import { FirebaseController } from '../../../firebase/FirebaseController';
import { Video,Audio } from 'expo-av';
import { AddUserData } from '../../../firebase/UserDataHandler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVPlaybackSource, AVPlaybackStatus } from 'expo-av/build/AV';
import { string } from 'yup/lib/locale';
import { add } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';


export default (props: StackScreenProps<VaultStackParamList, 'Manage'>) => {
    const { user } = props.route.params;
    user.vaultItems ? null : user.vaultItems = {
        photos: [],
        videos: [],
        quotes: [],
        audio:[],
    }
    const [option, setOption] = useState<number>(0)
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: LifeLineBlue, flexGrow: 1, flex: 1 }}>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={{ fontSize: 30, color: LifeLineBlue, alignSelf: 'center' }}>Select Option Below</Text>
                        <VaultItemsMenu setOption={setOption}></VaultItemsMenu>
                    </View>
                    <View style={styles.content}>
                        <Content user={props.route.params.user} option={option}></Content>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { props.navigation.goBack(); }}>
                            <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}>Back to Vault</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}




const Content = (props: { option: number, user: User }) => {
    const [fileName, setFileName] = useState("");
    const [image, setImage] = useState<string>();
    const [video, setVideo] = useState<string>();
    const [loading, setLoading] = useState(false);
    const videoRef = useRef(null);
    const [fileInfo, setFileInfo] = useState<{ filePath: string, type: string, }>()
    const [quote, setQuote] = useState<{quote:string,author:string}>();
    const [audioSource,setAudioSource] = useState<AVPlaybackSource>();
    const [playback,setPlayback] = useState<{sound:Audio.Sound,status:AVPlaybackStatus}>();
    const [audioIsPlaying,setAudioIsPlaying] = useState<boolean>(false);

    const [audio,setAudio] = useState(props.user.vaultItems?.audio);
    const [quotes,setQuotes] = useState(props.user.vaultItems?.quotes);
    const [photos,setPhotos] = useState(props.user.vaultItems?.photos);
    const [videos,setVideos] = useState(props.user.vaultItems?.videos);

    useEffect(()=>{
        console.log('syncing')
        if(props.user.vaultItems)
        {
            if(audio) props.user.vaultItems.audio = audio;
            if(videos) props.user.vaultItems.videos = videos;
            if(photos) props.user.vaultItems.photos = photos;
            if(quotes) props.user.vaultItems.quotes = quotes;
            AddUserData(props.user);
        }
        
    },[audio,videos,photos,quotes])

    const removeQuoteFromVault = async (quote:{quote:string,author:string})=>{
        if(quotes)
        {
            setQuotes(prev=>{
                if(prev)
                {
                    const index = prev.indexOf(quote);
                    const newArr = [...prev];
                    newArr.splice(index,1);
                    return newArr;
                }
            })

        }
        
    }

    const addQuoteToVault = async ()=>{
        setLoading(true)
        if(!quote)
        {
            alert('Please add a quote')
            setLoading(false);
        }
        else if(quote.quote.trim()=='')
        {
            alert('Please do not leave quote blank')
            setLoading(false)
        }
        else{

            if(props.user.vaultItems)
            {
                if(props.user.vaultItems.quotes) props.user.vaultItems.quotes.push(quote)
                else
                {
                    props.user.vaultItems.quotes=[];
                    props.user.vaultItems.quotes.push(quote);
                  

                }
                await AddUserData(props.user);


            }
            setLoading(false);
            setQuote(undefined);
            alert(`Quote has been added to the vault!`)
            
        }
    }

    const removeMediaFromVault = async(entry:MediaEntry)=>{
        const success = await FirebaseController.RemoveMediaFromVault(entry.path);
        if(success)
        {
            if(entry.type=='audio')
            {
                
                setAudio(prev=>{
                   
                    if(prev)
                    {
                        const newArr = [...prev]
                        const index = newArr.indexOf(entry);
                        newArr.splice(index,1);
                        return newArr;
                    }

                })

            }
            else if(entry.type='photo')
            {
                setPhotos(prev=>{
                   
                    if(prev)
                    {
                        const newArr = [...prev]
                        const index = newArr.indexOf(entry);
                        newArr.splice(index,1);
                        return newArr;
                    }

                })

            }
            else if(entry.title='video')
            {
                setVideos(prev=>{
                   
                    if(prev)
                    {
                        const newArr = [...prev]
                        const index = newArr.indexOf(entry);
                        newArr.splice(index,1);
                        return newArr;
                    }

                })

            }
        }

    }

    const addMediaToVault = async () => {
        setLoading(true);
        if (fileName.trim() == '') {
            alert("Please enter file name")
            setLoading(false);
            return;
        }
        if (fileInfo) {

            const entry = await FirebaseController.AddMediaToVault(props.user, fileInfo, fileName)
            switch (entry?.type) {
                case 'image':
                    {
                        if(props.user.vaultItems)
                        {
                            if(props.user.vaultItems.photos) props.user.vaultItems.photos.push(entry)
                            else
                            {
                                props.user.vaultItems.photos=[];
                                props.user.vaultItems.photos.push(entry);

                            }

                        }
                        break;

                    }
                case 'video':
                    {
                        if(props.user.vaultItems)
                        {
                            if(props.user.vaultItems.videos) props.user.vaultItems.videos.push(entry)
                            else
                            {
                                props.user.vaultItems.videos=[];
                                props.user.vaultItems.videos.push(entry);

                            }

                        }
                        break;
                    }
                case 'audio':
                    {
                        if(props.user.vaultItems)
                        {
                            if(props.user.vaultItems.audio) props.user.vaultItems.audio.push(entry)
                            else
                            {
                                props.user.vaultItems.audio=[];
                                props.user.vaultItems.audio.push(entry);

                            }

                        }
                       
                        break;
                    }
            }
            await AddUserData(props.user);


            setLoading(false);
            alert("You file has been added to the vault");
            setFileInfo(undefined)
            setImage(undefined)
            setVideo(undefined)
            setAudioSource(undefined)
            setPlayback(undefined)
        }
    }

    useEffect(()=>{
        const initPlayback = async ()=>{
            if(audioSource)setPlayback( await Audio.Sound.createAsync(audioSource))
        }
        initPlayback();
      
    },[audioSource])

    const playPauseAudio = async ()=>{
      
        if(audioIsPlaying)
        {
           if(playback) await playback.sound.pauseAsync();
              
        }
        else
        {
            if(playback) await playback.sound.playAsync();
            
        }
        setAudioIsPlaying(!audioIsPlaying)
    }

    const pickAudio = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'audio/*'
        })
        if (result.type === 'success') {
            setFileInfo({
                filePath: result.uri,
                type: 'audio'
            })
            setAudioSource({uri:result.uri})
            
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && (result.type == 'image' || result.type == 'video')) {

            setFileInfo({
                filePath: result.uri,
                type: result.type
            })
            switch (result.type) {
                case 'image':
                    {
                        setImage(result.uri);
                        setVideo(undefined);
                        break;
                    }
                case 'video':
                    {
                        setVideo(result.uri);
                        setImage(undefined);
                        break;
                    }
                default:
                    {
                        alert("please select image or video");
                    }
            }

        }
    };

    if (loading) return <ActivityIndicator size='large' color='white'></ActivityIndicator>

    switch (props.option) {
        case 0:
            {

                return (

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                        <Button mode='contained' color={LifeLineDarkBlue} onPress={pickImage}><Text>Choose Photo/Video</Text></Button>
                        {fileInfo?.filePath && <>
                            <TextInput style={{ backgroundColor: LifeLineBlue, color: 'white', fontSize: 20, borderColor: LifeLineDarkBlue, borderWidth: 5, alignSelf: 'stretch', textAlign: 'center' }} placeholder={'Enter file name'} onChangeText={(text) => setFileName(text)}></TextInput>
                            <Button mode='contained' color={LifeLineDarkBlue} onPress={() => { addMediaToVault(); }}>Add to Vault</Button>
                        </>}
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        {video && <Video
                            style={{ height: 200, width: 350 }}
                            ref={videoRef}
                            source={{
                                uri: video,
                            }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping

                        />}

                    </View>

                );
            }

        case 1:
            {
                return (
                    <View>
                             <TextInput multiline style={{ backgroundColor: LifeLineBlue, marginTop:10,color: 'white', fontSize: 20, borderColor: LifeLineDarkBlue, borderWidth: 5, alignSelf: 'stretch', textAlign: 'center' }} placeholder={'Enter quote'} defaultValue={quote?.quote} onChangeText={(text) => 
                             setQuote(prev=>{
                                 return {
                                    quote:text,
                                    author:prev?.author||'',
                                 }

                             })}></TextInput>
                              <TextInput textAlign='center' style={{ backgroundColor: LifeLineBlue, marginTop:10,color: 'white', fontSize: 20, borderColor: LifeLineDarkBlue, borderWidth: 5, alignSelf: 'stretch', textAlign: 'center' }} defaultValue={quote?.author} placeholder={'Enter author or leave blank'} onChangeText={(text) => 
                             setQuote(prev=>{
                                 return {
                                    quote:prev?.quote ||'',
                                    author:text
                                 }

                             })}></TextInput>
                                <Button mode='contained' color={LifeLineDarkBlue} onPress={addQuoteToVault}><Text>Add to vault</Text></Button>

                    </View>
                )


            }
        case 2:
            {
                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                        <Button mode='contained' color={LifeLineDarkBlue} onPress={pickAudio}><Text>Choose Audio</Text></Button>
                        {fileInfo?.filePath && <>
                            <TextInput style={{ backgroundColor: LifeLineBlue, color: 'white', fontSize: 20, borderColor: LifeLineDarkBlue, borderWidth: 5, alignSelf: 'stretch', textAlign: 'center' }} placeholder={'Enter file name'} onChangeText={(text) => setFileName(text)}></TextInput>
                            <Button mode='contained' color={LifeLineDarkBlue} onPress={() => { addMediaToVault(); }}>Add to Vault</Button>
                            {audioSource?<Button style={{margin:5}} mode='contained' color={LifeLineDarkBlue} onPress={()=>{playPauseAudio()}} ><MaterialCommunityIcons  name="play" color={LifeLineBlue} size={30} >
                                <Text>{audioIsPlaying?'Pause':'Play'}</Text>
                                </MaterialCommunityIcons></Button>:<></>}
                        </>}
                    </View>
                )
            }
        case 3:
            {
                return (
                    <ScrollView style={{margin:10}}>
                        <Divider style={{borderColor:'white',borderWidth:1}}/>
                        <Text style={{color:'white',fontSize:15,alignSelf:'center'}}>Quotes</Text>
                        {quotes?.length==0?<Text style={{alignSelf:'center',color:'white',fontSize:20}}>No Quotes</Text>:<>
                        {
                            quotes?.map(item=><View style={{flexDirection:'row',borderWidth:2,margin:1,borderColor:LifeLineDarkBlue}} key={Math.random()*quotes.indexOf(item)+1}>
                            <Text style={{flex:1,fontSize:20,textAlignVertical:'center'}}>"{item.quote}" -{item.author==''?"Unknown":item.author}</Text>
                           <TouchableOpacity onPress={async()=>{
                               await removeQuoteFromVault(item);
                           }} style={{alignSelf:'center'}}><MaterialCommunityIcons size={40} name='trash-can'></MaterialCommunityIcons></TouchableOpacity> 
                        </View>)
                        }
                        </>}
                        <Divider style={{borderColor:'white',borderWidth:1}}/>
                        <Text style={{color:'white',fontSize:15,alignSelf:'center'}}>Photos</Text>
                        {photos?.length==0?<Text style={{alignSelf:'center',color:'white',fontSize:20}}>No Photos</Text>:<>
                        {
                            photos?.map(item=><View style={{flexDirection:'row'}} key={item.url}>
                            <Text style={{flex:1,fontSize:25}}>{item.title}</Text>
                           <TouchableOpacity
                           onPress={async()=>{
                               await removeMediaFromVault(item);
                           }}><MaterialCommunityIcons size={25} name='trash-can'></MaterialCommunityIcons></TouchableOpacity> 
                        </View>)
                        }</>}
                        <Divider style={{borderColor:'white',borderWidth:1}}/>
                        <Text style={{color:'white',fontSize:15,alignSelf:'center'}}>Videos</Text>
                        {videos?.length==0?<Text style={{alignSelf:'center',color:'white',fontSize:20}}>No Videos</Text>:<>
                        {
                            videos?.map(item=><View style={{flexDirection:'row'}} key={item.url}>
                            <Text style={{flex:1,fontSize:25}}>{item.title}</Text>
                           <TouchableOpacity
                           onPress={async()=>{
                               await removeMediaFromVault(item);
                           }}><MaterialCommunityIcons size={25} name='trash-can'></MaterialCommunityIcons></TouchableOpacity> 
                        </View>)

                        }
                        </>}
                          <Divider style={{borderColor:'white',borderWidth:1}}/>
                          <Text style={{color:'white',fontSize:15,alignSelf:'center'}}>Audio</Text>
                        {audio?.length==0?<Text style={{alignSelf:'center',color:'white',fontSize:20}}>No Audio</Text>:<>
                        {
                            audio?.map(item=><View style={{flexDirection:'row'}} key={item.url}>
                                <Text style={{flex:1,fontSize:25}}>{item.title}</Text>
                               <TouchableOpacity onPress={async()=>{
                                   await removeMediaFromVault(item);
                               }}><MaterialCommunityIcons size={25} name='trash-can'></MaterialCommunityIcons></TouchableOpacity> 
                            </View>)
                        }</>}
                        <Divider style={{borderColor:'white',borderWidth:1}}/>
                       
                     
                    </ScrollView>
                )

            }
        default:
            {
                return (
                    <View></View>
                )

            }
    }

}

const styles = StyleSheet.create({
    menuItem:{
        backgroundColor:LifeLineDarkBlue
    },
    menuIcon:{
        alignSelf:'center',
        fontSize:20,
        color:LifeLineBlue

    },
    menuTitle:{
        fontSize:15,
        color:LifeLineBlue
    },
    button: {
        backgroundColor: LifeLineBlue,
        borderRadius: 15

    },
    container: {
        backgroundColor: LifeLineDarkBlue,
        flex: 1,



    },
    content: {
        flex: 2,
        backgroundColor: LifeLineBlue
    },
    footer: {
        alignItems: 'stretch',
        margin: 10,

    },
    header: {
        marginTop: 5
    }


})