import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';

import Params from '../params';
import Mine from './mine';
import Flag from './fleg'


export default props => {
    const { mined, opened, nearMines, exploded, flegged} = props;

    const estiloField = [styles.field];
    // outros estilo aqui!
    if(opened) estiloField.push(styles.opened);
    if(flegged) estiloField.push(styles.flagged);
    if(exploded) estiloField.push(styles.exploded);
    if(!opened && !exploded) estiloField.push(styles.regular);

    let color = null
    if(nearMines > 0){
        if(nearMines == 1) color = '#2a28d7';
        if(nearMines == 2) color='#2b50fa';
        if(nearMines > 2 && nearMines <6 ) color ='#f9060a';
        if(nearMines >= 6) color ='#f221a9';
    }


    return(
        <TouchableWithoutFeedback onPress={props.onOpen} 
                onLongPress={props.onSelect}>
        <View style={estiloField}>
            {!mined && opened && nearMines>0 ?
                <Text style={[styles.label, {color: color}]}>
                    {nearMines}
                </Text> : false}
                {mined && opened ? <Mine />: false}
                {flegged && !opened ? <Flag />: false}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    field:{
        height: Params.blockSize,
        width: Params.blockSize,
        borderWidth: Params.borderSize
    },
    regular:{
        backgroundColor:'#999',
        borderLeftColor: '#ccc',
        borderTopColor: '#ccc',
        borderRightColor:'#333',
        borderBottomColor: '#333'
    },
    opened:{
        backgroundColor: '#555',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label:{
        fontWeight: 'bold',
        fontSize: Params.fontSize
    },
    exploded:{
        backgroundColor: 'red',
        borderColor: 'red'
    }
});