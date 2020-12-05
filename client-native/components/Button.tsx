import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native'

export interface ButtonProps {
    onPress(): Promise<void> | void,
    title: string
}

export const Button : React.FC<ButtonProps> = ({onPress, title}) => {

    return (
        <TouchableHighlight  
        activeOpacity={0.6}
        underlayColor="#0099CC"
        onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#33b5e5",
        paddingVertical: 15,
        elevation: 6
    },
    text: {
        fontSize: 18,
        color: "#FFF",
        textAlign: "center"
    }
  });