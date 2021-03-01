import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#FB8500',
        paddingTop:40,
        textAlign:'left',
        paddingBottom:800,
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
        height: 35,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        width:350,
        marginBottom:30,
    },
    button: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
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
    }
})