import React, {useState ,useEffect} from 'react';
import { useNavigation} from '@react-navigation/native'
import { View, FlatList, Text, TouchableOpacity, AsyncStorage, ActivityIndicator  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import api from '../../services/api';

import styles from './styles';

export default function Grupos(){
    const navigation = useNavigation();
    const [ gruposusuario, setGruposUsuario] = useState([]);
    const [ token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [ spinner, setSpinner] =useState(false);
    const [ atualizar, setAtualizar] = useState(false);
    
    function navigateToDetais(id){
        navigation.navigate('Detalhes', {id});
    };
    async function logout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };
    async function newGrupo(){
        navigation.navigate('NewGrupo');
    };
    
    async function getStorage(){
        const t = await AsyncStorage.getItem('token');
        const u = await AsyncStorage.getItem('nome');
        setToken(t);
        setUser(u);
    }
    const config= {headers: {Authorization : `Bearer ${token}`}};
    
    async function getGrupos(){
        setSpinner(true);
        
        try {
            const response = await api.get('gruposusuario', config);
            setGruposUsuario(response.data);
        } catch (error) {
        }
        setSpinner(false);
    };

    useEffect(() => {
        getGrupos();
        getStorage();
    },[token, atualizar]);


    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.usuario}>
                    Olá {user}!
                </Text>
                <Text style={styles.total}>
                    Total de {gruposusuario.length} grupos
                </Text>
            </View>
            {spinner &&
                <View style={[styles.header, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
            }

            <FlatList 
                style={styles.ListaGrupos}
                data={gruposusuario}
                keyExtractor={group => String(group._id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item:group}) => (
                    <TouchableOpacity onPress={() => navigateToDetais(group._id)}>
                        <View style={styles.grupo}>
                            <Text style={styles.grupoNome}>{group.nome}</Text>
                            <Text style={styles.data}>Sorteio: {group.dataSorteio}</Text>
                            <Text style={styles.data}>Status: {group.status}</Text>
                            <Text style={styles.data}>Criado por {group.criadoPor}</Text>

                        </View>
                    </TouchableOpacity>
                )}    
            /> 

            <View style={styles.navegacao}>
                <TouchableOpacity onPress={() => setAtualizar(!atualizar)}>
                    <FontAwesome name='home' size={25} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <FontAwesome name='user-circle' size={25} color="#FFFFFF" />
                </TouchableOpacity> 
                <TouchableOpacity onPress={newGrupo}>
                    <FontAwesome name='plus' size={25} color="#FFFFFF" />
                </TouchableOpacity>  
                <TouchableOpacity onPress={logout}>
                    <FontAwesome name='sign-out' size={25} color="#FFFFFF" />
                </TouchableOpacity>  
            </View>

        </View>
    );
}