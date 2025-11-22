import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

export default function Option() {
    const [name, setName] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleOptionChange = (text, index) => {
        const newOptions = [...options];
        newOptions[index] = text;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Text style={styles.headerText}>Optional Poll</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your question"
                    placeholderTextColor="#C4C4C4"
                    value={name}
                    onChangeText={setName} />

                {options.map((option, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        placeholder={`Option ${index + 1}`}
                        placeholderTextColor="#C4C4C4"
                        value={option}
                        onChangeText={(text) => handleOptionChange(text, index)}
                    />
                ))}

                <TouchableOpacity style={styles.addButton} onPress={addOption}>
                    <Text style={styles.addButtonText}>+ Add Option</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => console.log('Create a Poll', { question: name, options })}>
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
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'RoarGuroes',
        fontSize: 24,
        color: '#000',
    },
    addButton: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    addButtonText: {
        fontFamily: 'RoarGuroes',
        fontSize: 18,
        color: '#789C56',
    },
});
