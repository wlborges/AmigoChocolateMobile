import React from 'react';
import { useNavigation} from '@react-navigation/native'
import { View, Image, FlatList, Text, TouchableOpacity, TextInput, Button } from 'react-native';

import styles from './styles';
import Icone from '../../assets/icone.png'

export default function Grupos(){
    const navigation = useNavigation();

    function navigateToGrupos(){
        navigation.navigate('Grupos');
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
                <TextInput style={styles.input} keyboardType='email-address' placeholder="Email"/>
                <TextInput style={styles.input} placeholder="Senha"/>
                <TouchableOpacity onPress={navigateToGrupos}>
                    <Text style={styles.btnLogin}>Login</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.cadastro}>Não tenho cadastro</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}