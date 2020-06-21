import React, {useState ,useEffect} from 'react';
import { useNavigation, useRoute} from '@react-navigation/native'
import { View, FlatList, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';

export default function Grupos(){
    const navigation = useNavigation();
    const [ gruposusuario, setGruposUsuario] = useState([]);
    const [ token, setToken] = useState('');
    const [ user, setUser] = useState('');
    const [ email, setEmail] = useState('');
    const [ amigo, setAmigo] = useState('');
    const [ ocultaAmigo, setOcultaAmigo] = useState(true);
    const [ atualizar, setAtualizar] = useState(false);
    const [ spinner, setSpinner] =useState(false);

    const rotas = useRoute();
    const id = rotas.params.id;
    function navigationBack(){
        navigation.goBack();
    }
    async function getStorage(){
        const t = await AsyncStorage.getItem('token');
        const u = await AsyncStorage.getItem('nome');
        const e = await AsyncStorage.getItem('email');
        setToken(t);
        setUser(u);
        setEmail(e);
    }

    async function getGrupos(){
        setSpinner(true);
        const config= {headers: {Authorization : `Bearer ${token}`}};
        try {
            console.log("chamando api");
            const response = await api.get('grupo/'+ id, config);
            console.log("OK");
            setGruposUsuario(response.data);
        } catch (error) {
        }
        setSpinner(false);
    };
    async function sortear(id){
        setSpinner(true);
        const config= {headers: {Authorization : `Bearer ${token}`}};
        try {
            const response = await api.get('grupo/sorteio/'+ id, config);
            setGruposUsuario(response.data);
            setAtualizar(!atualizar);
        } catch (error) {
        }
        setSpinner(false);
    };
    async function desfazerSorteio(_id){
        setSpinner(true);
        const config= {headers: {Authorization : `Bearer ${token}`}};
        const data = { _id}
        try {
            const response = await api.post('grupo/sorteio', data, config);
            setGruposUsuario(response.data);
            setAtualizar(!atualizar);
        } catch (error) {
        }
        setSpinner(false);
    };

    useEffect(() => {
        getStorage();
        getGrupos();
    },[token, atualizar]);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.usuario}>
                    Olá {user}!
                </Text>
                <TouchableOpacity onPress={navigationBack}>
                    <FontAwesome name='arrow-left' size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            {spinner &&
                <View style={[styles.header, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
            }
            <View style={styles.grupo}>
                <Text style={styles.grupoNome}>{gruposusuario.nome}</Text>
                <Text style={styles.data}>Sorteio: {gruposusuario.dataSorteio}</Text>
                <Text style={styles.data}>Evento: {gruposusuario.dataEvento}</Text>
                <Text style={styles.data}>Status : {gruposusuario.status}</Text>
                <Text style={styles.data}>Criado por {gruposusuario.criadoPor}</Text>
                <Text style={styles.data}>Valor entre R$ {gruposusuario.valorMinimo} - {gruposusuario.valorMaximo}</Text>
                {(gruposusuario.status === "Sorteado") && !ocultaAmigo &&
                    <Text style={styles.data}>Amigo: {String(amigo)}</Text>
                }

            </View>

            <View style={styles.menu}>
                    <View style={styles.menuIcones}>
                        {(gruposusuario.status === "Em Aberto") &&
                            <TouchableOpacity onPress={navigationBack}>
                                <FontAwesome name='user-plus' size={20} color="#037D25" />
                            </TouchableOpacity>
                        }
                        {(gruposusuario.status === "Em Aberto") &&
                            <TouchableOpacity onPress={() => {}}>
                                <FontAwesome name='edit' size={20} color="#000000" />
                            </TouchableOpacity>
                        }
                        {(gruposusuario.status === "Em Aberto") &&
                            <TouchableOpacity onPress={() => sortear(gruposusuario._id)}>
                                <FontAwesome name='random' size={20} color="#000000" />
                            </TouchableOpacity>
                        }
                        {(gruposusuario.status === "Sorteado") &&
                            <TouchableOpacity onPress={() => setOcultaAmigo(!ocultaAmigo)}>
                                <FontAwesome name={ocultaAmigo? 'eye' : 'eye-slash'} size={20} color="#000000" />
                            </TouchableOpacity>
                        }
                        {(gruposusuario.status === "Sorteado") &&
                            <TouchableOpacity onPress={() => desfazerSorteio(gruposusuario._id)}>
                                <FontAwesome name='undo' size={20} color="#000000" />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={navigationBack}>
                            <FontAwesome name='trash' size={20} color="#B32923" />
                        </TouchableOpacity>
                    </View>
            </View>

            <FlatList 
                style={styles.ListaGrupos}
                data={gruposusuario.participantes}
                keyExtractor={participante => String(participante._id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item : participante}) => (
                <View style={styles.participante}>
                    {participante.email === email ? setAmigo(participante.amigo) : () => {}}
                    <Text style={styles.participanteNome}>{participante.nome}</Text>
                    <Text style={styles.data}>{participante.email}</Text>
                    {(gruposusuario.status === "Em Aberto") &&
                        <TouchableOpacity onPress={navigationBack}>
                            <FontAwesome style={styles.iconeRemover} name='user-times' size={20} color='#B32923' />
                        </TouchableOpacity>
                    }

                </View>
                )}    
            />
        </View>
    )
}