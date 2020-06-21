import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#7159C1',
        paddingBottom:30,
    },
    usuario:{
        flexDirection: 'row',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    grupo:{
        marginTop: 10,
        marginBottom:10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    grupoNome:{
        fontWeight: 'bold',
        textAlign: 'center',
    },
    participante:{
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    participanteNome:{
        fontWeight: 'bold',
        textAlign: 'left',
    },
    iconeRemover:{
        marginLeft:'auto',
    },
    menu:{
        padding:10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    menuIcones:{
        flexDirection:'row',
        justifyContent:'space-around'

    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
})