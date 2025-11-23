import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
    const router = useRouter();
    const { signUp } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        // Reset error
        setError('');

        // Validation
        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }

        if (!email.trim()) {
            setError('Please enter your email');
            return;
        }

        if (!password) {
            setError('Please enter a password');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const result = await signUp(email, password, name);

        setLoading(false);

        if (result.success) {
            // Navigate to poll create screen on successful sign up
            router.replace('/pollCreate');
        } else {
            // Show error message
            setError(result.error || 'Failed to create account');
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Text style={styles.headerText}>Sign Up</Text>
    
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    placeholderTextColor="#C4C4C4"
                    value={name}
                    onChangeText={setName}
                    editable={!loading}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    placeholderTextColor="#C4C4C4"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor="#C4C4C4"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    editable={!loading}
                />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleSignUp}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/Login')} disabled={loading}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

//StyleSheet -------------------------------------------------------------------------------------

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
    buttonDisabled: {
        opacity: 0.6,
    },
    errorText: {
        color: '#D32F2F',
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'center',
    },
    loginText: {
        fontFamily: 'RoarGuroes',
        fontSize: 16,
        color: '#2D2D2D',
        marginTop: 15,
    },
});
