import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Stack, router } from 'expo-router';


export default function PollCreate() {
    return (
        <ImageBackground source={require('../assets/images/image.png')} style={styles.container}>
            <Stack.Screen options={{
                headerShown: false
            }} />

            <TouchableOpacity style={styles.button} onPress={() => router.replace('/descriptive')}>
                <Text style={styles.buttonText}>Create a Descriptive Poll</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/option')}>
                <Text style={styles.buttonText}>Create a Optional Poll</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffeeeeff',
    },
    button: {
        backgroundColor: '#789C56',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#000000ff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'RoarGuroes',
    },
});