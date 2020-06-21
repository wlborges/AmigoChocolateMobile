import React, { useState } from 'react';
import { useNavigation} from '@react-navigation/native'
import { View, Image, FlatList, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';

import styles from './styles';
import Icone from '../../assets/icone.png';
import api from '../../services/api';

export default function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function navigateToRegister(){
        navigation.navigate('Register');
    };
    function navigateToGrupos(){
        navigation.navigate('Grupos');
    };
    async function login(){
        const data = {
            email,
            senha
        };
        try {
            const response = await api.post('login',data);
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('nome', response.data.nome);
            await AsyncStorage.setItem('email', email);
            navigateToGrupos();
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
                    onSubmitEditing={login}
                />
                <TouchableOpacity onPress={login}>
                    <Text style={styles.btnLogin}>Login</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToRegister}>
                    <Text style={styles.cadastro}>Não tenho cadastro</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}