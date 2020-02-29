import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';

export default props => {
    return(
        <Modal onRequestClose={props.onCancel}
                visible={props.isVisible}
                animationType='slide'
                transparent={true}>
            <View style={styles.frame}>
                <View style={styles.conteiner}>
                    <Text style={styles.title}>Selecione o nivel</Text>
                </View>
                <TouchableOpacity style={[styles.button, styles.bgeasy]}
                            onPress={()=>props.onLevelSelect(0.1)}>
                            <Text style={styles.buttonLabel}>Facil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.bgnormal]}
                            onPress={()=>props.onLevelSelect(0.2)}>
                            <Text style={styles.buttonLabel}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.bgHard]}
                            onPress={()=>props.onLevelSelect(0.3)}>
                            <Text style={styles.buttonLabel}>Dificil</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    frame :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    conteiner:{
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent:'center',
        padding: 15
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    button:{
        marginTop: 10,
        padding: 5
    },
    buttonLabel:{
        fontSize:20,
        color: '#EEE',
        fontWeight:'bold'
    },
    bgeasy:{ backgroundColor: '#49b65d' },
    bgnormal:{ backgroundColor: '#2756f7' },
    bgHard:{ backgroundColor: '#f26337' }

});


