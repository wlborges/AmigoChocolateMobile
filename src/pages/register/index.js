import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { useNavigation} from '@react-navigation/native'
import { View, Image, FlatList, Text, TouchableOpacity, TextInput, Button, AsyncStorage } from 'react-native';

import styles from './styles';
import Icone from '../../assets/icone.png';
import api from '../../services/api';

export default function Register(){
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function navigateToLogin(){
        navigation.navigate('Login');
    }
    async function register(){
        const data = {
            nome,
            dataNascimento,
            email,
            senha
        };
        try {
            const response = await api.post('usuario',data);
            navigateToLogin();
            alert(response.data.msg)
        } catch (error) {
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
            <View style={styles.imagem}>
                <Image source={Icone} />
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
                            placeholder="Data de Nascimento"
                            format="DD/MM/YYYY"
                            minDate="01-01-1900"
                            maxDate={new Date}
                            confirmBtnText="Ok"
                            cancelBtnText="Cancelar"
                            date={dataNascimento}
                            onDateChange={(date) => {setDataNascimento(date)}}
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
                    keyboardType='email-address'
                    placeholder="Email"
                    returnKeyType='next'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Senha"
                    returnKeyType='send'
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                    onSubmitEditing={register}
                />
                <TouchableOpacity onPress={register}>
                    <Text style={styles.btnLogin}>Cadastrar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToLogin}>
                    <Text style={styles.cadastro}>Tenho cadastro</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}