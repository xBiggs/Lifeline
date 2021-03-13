import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    searchBox: {
        backgroundColor: 'orange',
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        color: 'black',
        fontSize: 20,
    },
    lineStyle: {
        height: 20,
        backgroundColor: '#9c9fa1',
        margin: 10,
        borderRadius: 10,
    },
    activityIndicatorView: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatListView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    renderItemView: {
        minHeight: 70,
        padding: 5,
        marginLeft: 7
    },
    renderItemText: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 20
    }
})