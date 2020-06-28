import React, {useState ,useEffect} from 'react';
import { useNavigation, useRoute} from '@react-navigation/native'
import { View, FlatList, Text, TouchableOpacity, AsyncStorage, ActivityIndicator, Alert, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

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
    const [ apagar, setApagar] = useState(false);
    const [ boxAdd, setBoxAdd] = useState(false);
    const [ emailParticipante, setEmailParticipante] = useState('');

    const rotas = useRoute();
    const id = rotas.params.id;
    async function logout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };
    async function newGrupo(){
        navigation.navigate('NewGrupo');
    };
    async function navigateToHome(){
        navigation.navigate('Grupos');
    };
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
            const response = await api.get('grupo/'+ id, config);
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
            setAtualizar(!atualizar);
        } catch (error) {
        }
        setSpinner(false);
    };
    async function desfazerSorteio(_id){
        setSpinner(true);
        const config= {headers: {Authorization : `Bearer ${token}`}};
        const data = {_id}
        try {
            const response = await api.post('grupo/sorteio', data, config);
            setAtualizar(!atualizar);
        } catch (error) {
        }
        setSpinner(false);
    };

    async function addParticipante(email){
        setSpinner(true);
        const config= {headers: {Authorization : `Bearer ${token}`}};
        const data ={
            _id : gruposusuario._id,
            email
        };
            try {
                const response = await api.put('grupo/participante', data, config);
                setEmailParticipante('');
                setSpinner(false);
                setBoxAdd(false);
                setAtualizar(!atualizar);
            } catch (error) {
            }
        setSpinner(false);
    }
    async function removeParticipante(email){
        setSpinner(true);
        const config= {headers: {Authorization : `Bearer ${token}`}};
        const data ={
            _id : gruposusuario._id,
            email
        };
            try {
                const response = await api.post('grupo/participante', data, config);
                setEmailParticipante('');
                setSpinner(false);
                setAtualizar(!atualizar);
            } catch (error) {
            }
        setSpinner(false);
    }

    async function removeGrupo(_id){
        setSpinner(true);
        Alert.alert("Apagar", "Deseja apagar",
            [
                {
                    text:"Sim", 
                    onPress:() => setApagar(true)
                },
                {
                    text:"Não",
                    onPress:() => setApagar(false),
                    style:'cancel'
                 }
            ],
            {cancelable:false}
        );
        if(apagar){
            setApagar(false);
            const config= {headers: {Authorization : `Bearer ${token}`}};
            try {
                const response = await api.delete('grupo/'+ _id, config);
                setSpinner(false);
                navigateToHome();
                setAtualizar(!atualizar);
            } catch (error) {
            }
        }
        setSpinner(false);
    };

    useEffect(() => {
        getStorage();
        getGrupos();
    },[token, atualizar]);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.usuario}>
                    Olá {user}!
                </Text>
                <TouchableOpacity onPress={navigateToHome}>
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
                            <TouchableOpacity onPress={() => setBoxAdd(!boxAdd)}>
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
                        <TouchableOpacity onPress={() => removeGrupo(gruposusuario._id)}>
                            <FontAwesome name='trash' size={20} color="#B32923" />
                        </TouchableOpacity>
                    </View>
            </View>

            {boxAdd &&
                <View style={styles.menuAdd}>
                        <View style={styles.adicionar}>
                        <TextInput 
                            style={styles.input}
                            keyboardType='email-address'
                            placeholder="Email novo participante"
                            returnKeyType='next'
                            value={emailParticipante}
                            onChangeText={(text) => setEmailParticipante(text)}
                        />
                        <TouchableOpacity onPress={() => addParticipante(emailParticipante)}>
                        <Text style={styles.btnAdicionar}>Adicionar</Text>    
                            </TouchableOpacity>
                        </View>
                </View>
            }

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
                        <TouchableOpacity onPress={() => {removeParticipante(participante.email)}}>
                            <FontAwesome style={styles.iconeRemover} name='user-times' size={20} color='#B32923' />
                        </TouchableOpacity>
                    }

                </View>
                )}    
            />

            <View style={styles.navegacao}>
                <TouchableOpacity onPress={navigateToHome}>
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
        </ScrollView>
    )
}