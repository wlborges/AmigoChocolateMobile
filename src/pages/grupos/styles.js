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
    total:{
        paddingTop: 25,
        flexDirection: 'row',
        fontSize: 18,
        textAlign: 'right',
        color: 'white',
    },
    ListaGrupos:{
        marginTop: 30,
    },
    grupo:{
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    grupoNome:{
        fontWeight: 'bold',
        textAlign: 'center',
    }

})