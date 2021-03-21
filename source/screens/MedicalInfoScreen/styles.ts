import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';

export default StyleSheet.create({
    container: {
        backgroundColor:'#FB8500',
    },
    modal:{backgroundColor:'#FB8500'},
    title: {
        marginBottom:20,
        color: 'white',
        fontSize: 32,
        fontWeight: "bold",
        alignSelf:'stretch',
        marginLeft:40,
        marginTop:20,
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
   input: {
        height: 35,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginRight: 30,
        paddingLeft: 16,
        width:300,
        marginBottom:30,
    },
    error:{
            color:'white',
            marginTop:-25,
            marginBottom:20,
    },
    button: {
        height: 48,
        width:200,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonAdd: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        height: 48,
        marginBottom:15,
        width:350,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor:'white',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: "bold",
        alignSelf:'stretch',
        marginLeft:40,
    },
  pageTitle: {
        color: 'white',
        fontSize: 30,
        marginBottom:20,
        fontWeight: "bold",
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
    buttonLabelAdd:{
        color: '#006400',
        fontSize: 20,
        fontWeight: "bold",
        padding:10,
        width:350,
        textAlign:"center",
    },
    view:{
        marginLeft:5,
        marginRight:5,
    },
    inputContainer:{
        backgroundColor:'#FB8500',
            paddingLeft:40,
            paddingTop:0,
            marginBottom:20,
    },
    subTitle:{
            fontSize:20,
            marginBottom:10,
    },
    MainTitle:{
        fontSize:30,
        marginBottom:20,
        backgroundColor:'#219ebc',
        color:'white',
        width:500,
        marginLeft:-20,
        paddingLeft:20,
        paddingTop:10,
        paddingBottom:10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor:"#FB8500",
        borderRadius: 40,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:400,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
      },
    radioContainer:{
        backgroundColor:'#FB8500',
            paddingTop:20,
            paddingBottom:30,
    },
    radioText:{
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft:40,
    }
    ,containerCheck:{
        width:150,
backgroundColor:"#FB8500",
borderWidth:0,
    }
});