import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#219ebc',
        paddingTop:30,
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
        marginLeft: 0,
        marginRight: 0,
        marginTop: 20,
        height: 48,
        flex:.8,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
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