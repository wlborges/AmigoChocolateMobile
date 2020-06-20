import React from 'react';
import { useNavigation} from '@react-navigation/native'
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


import styles from './styles';

export default function Grupos(){
    const navigation = useNavigation();

    function navigateToDetais(){
        navigation.navigate('Detalhes');
    };
    function navigateToLogin(){
        navigation.navigate('Login');
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateToLogin}>
                    <FontAwesome name='sign-out' size={25} color="#FFFFFF" />
                </TouchableOpacity> 
                <Text style={styles.usuario}>
                    Olá usuario!
                </Text>
                <Text style={styles.total}>
                    Total de 0 grupos
                </Text>
            </View>

            <FlatList 
                style={styles.ListaGrupos}
                data={[1,2,3,4,5,6]}
                keyExtractor={grupos => String(grupos)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <TouchableOpacity onPress={navigateToDetais}>
                        <View style={styles.grupo}>
                            <Text style={styles.grupoNome}>Ano Novo</Text>
                            <Text style={styles.data}>Sorteio: 31/12/2020</Text>
                            <Text style={styles.data}>Status: Em Aberto</Text>
                            <Text style={styles.data}>Criado por Wellington</Text>

                        </View>
                    </TouchableOpacity>


                )}    
            />



        </View>
    )
}