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
    header:{
        marginTop: 10, 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    nomeBold:{
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold' 
    },
    nome:{
        fontSize: 35,
        color: 'white', 
    },
    imagem:{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    form:{
        marginTop: 30,
    },
    input:{
        marginTop: 15,
        backgroundColor:'white',
        padding: 10,
        borderRadius: 10,

    },
    btnLogin:{
        marginTop: 20,
        padding: 10, 
        backgroundColor: '#4C3E7D',
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderRadius: 10,
    },
    cadastro:{
        marginTop: 15,
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        
    }

})