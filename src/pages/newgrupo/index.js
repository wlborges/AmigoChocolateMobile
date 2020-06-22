import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker';
import { useNavigation} from '@react-navigation/native'
import { View, Image, FlatList, Text, TouchableOpacity, TextInput, Button, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';
import Icone from '../../assets/icone.png';
import api from '../../services/api';

export default function NewGrupo(){
    const navigation = useNavigation();
    const [ token, setToken] = useState('');
    const [nome, setNome] = useState('');
    const [dataSorteio, setDataSorteio] = useState('');
    const [dataEvento, setDataEvento] = useState('');
    const [valorMinimo, setValorMinimo] = useState('');
    const [valorMaximo, setValorMaximo] = useState('');

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
        setToken(t);
    }
    useEffect(() => {
        getStorage();
    },[]);

    const config= {headers: {Authorization : `Bearer ${token}`}};

    async function create(){
        const data = {
            nome,
            dataSorteio,
            dataEvento,
            valorMinimo,
            valorMaximo
        };
        try {
            console.log(data);
            const response = await api.post('grupo',data,config);
            console.log(response.data.msg);
            navigateToHome();
            console.log("ok");
        } catch (error) {
            console.log("erro")
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.nomeBold}>
                    Amigo 
                </Text>
                <Text style={styles.nome}>
                    Chocolate 
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Nome"
                    returnKeyType='next'
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                <DatePicker
                            style={styles.input}
                            showIcon={false}
                            mode="date"
                            placeholder="Data de Sorteio"
                            format="YYYY-MM-DD"
                            minDate={new Date}
                            maxDate='2050-06-01'
                            confirmBtnText="Ok"
                            cancelBtnText="Cancelar"
                            date={dataSorteio}
                            onDateChange={(date) => {setDataSorteio(date)}}
                            customStyles={{
                                dateIcon:{
                                    borderColor:'#fff'
                                },
                                dateInput:{
                                    borderColor:'#fff',
                                },  
                            }}
                        />
                    <DatePicker
                            style={styles.input}
                            showIcon={false}
                            mode="date"
                            placeholder="Data de Evento"
                            format="YYYY-MM-DD"
                            minDate={dataSorteio}
                            maxDate='2050-06-01'
                            confirmBtnText="Ok"
                            cancelBtnText="Cancelar"
                            date={dataEvento}
                            onDateChange={(date) => {setDataEvento(date)}}
                            customStyles={{
                                dateIcon:{
                                    borderColor:'#fff'
                                },
                                dateInput:{
                                    borderColor:'#fff',
                                },  
                            }}
                        />
                <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="Valor Minimo"
                    returnKeyType='next'
                    value={valorMinimo}
                    onChangeText={(text) => setValorMinimo(text)}
                />
                <TextInput 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="Valor Minimo"
                    returnKeyType='send'
                    value={valorMaximo}
                    onChangeText={(text) => setValorMaximo(text)}
                    onSubmitEditing={create}
                />
                <TouchableOpacity onPress={create}>
                    <Text style={styles.btnLogin}>Cadastrar</Text>    
                </TouchableOpacity>
            </View>

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
        </View>
    )
}