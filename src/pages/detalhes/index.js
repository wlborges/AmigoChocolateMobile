import React from 'react';
import { useNavigation} from '@react-navigation/native'
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function Grupos(){
    const navigation = useNavigation();

    function navigationBack(){
        navigation.goBack();
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.usuario}>
                    Olá usuario!
                </Text>
                <TouchableOpacity onPress={navigationBack}>
                    <FontAwesome name='arrow-left' size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.grupo}>
                <Text style={styles.grupoNome}>Ano Novo</Text>
                <Text style={styles.data}>Sorteio: 01/12/2020</Text>
                <Text style={styles.data}>Evento: 31/12/2020</Text>
                <Text style={styles.data}>Status : Em Aberto</Text>
                <Text style={styles.data}>Criado por Wellington</Text>
                <Text style={styles.data}>Valor entre R$ 10 - 20</Text>
                <Text style={styles.data}>Amigo</Text>

            </View>

            <FlatList 
                style={styles.ListaGrupos}
                data={[1,2,3,4,5,6]}
                keyExtractor={grupos => String(grupos)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                <View style={styles.participante}>
                    <Text style={styles.participanteNome}>João da Silva</Text>
                    <Text style={styles.data}>joao@silva.com</Text>

                </View>
                )}    
            />
        </View>
    )
}