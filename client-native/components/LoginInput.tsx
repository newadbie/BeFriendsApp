import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export type LoginInputProps = {
    text : string,
    value: string,
    changeValueAction(e :string) : void
    secureTextEntry?: boolean
}

export const LoginInput : React.FC<LoginInputProps> = ({text, value, changeValueAction, secureTextEntry}) => {
    // if (!secureTextEntry) {
    //     console.log(secureTextEntry + "auu")
    //     secureTextEntry = false;
    // }
    return (
        <View style={styles.container}>
            <Text style={styles.center}>{text}</Text>
            <TextInput style={styles.input} 
            value={value}
            onChangeText={changeValueAction}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:5,
        marginBottom:2
    },
    input: {
        borderColor: "blue",
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
      },
      center: {
        textAlign: "center",
        paddingBottom: 5,
      },
})