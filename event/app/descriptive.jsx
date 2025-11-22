import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { Stack } from 'expo-router';

export default function descriptive() {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Text style={styles.headerText}>Descriptive Poll</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your question"
                    placeholderTextColor="#C4C4C4"
                    value={name}
                    onChangeText={setName} />
                <TouchableOpacity style={styles.button} onPress={() => console.log('Create a Poll')}>
                    <Text style={styles.buttonText}>Go Live</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    headerText: {
        fontFamily: 'RoarGuroes',
        fontSize: 48,
        marginBottom: 60,
        color: '#2D2D2D',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 50,
    },
    input: {
        fontFamily: 'RoarGuroes',
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#2D2D2D',
        paddingVertical: 10,
        marginBottom: 30,
        color: '#2D2D2D',
    },
    button: {
        backgroundColor: '#789C56',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    buttonText: {
        fontFamily: 'RoarGuroes',
        fontSize: 24,
        color: '#000',
    },
});
