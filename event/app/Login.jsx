import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [Lemail, LsetEmail] = useState('');
    const [Lpassword, setLpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        // Reset error
        setError('');

        // Validation
        if (!Lemail.trim()) {
            setError('Please enter your email');
            return;
        }

        if (!Lpassword) {
            setError('Please enter your password');
            return;
        }

        setLoading(true);

        const result = await signIn(Lemail, Lpassword);

        setLoading(false);

        if (result.success) {
            // Navigate to poll create screen on successful login
            router.replace('/pollCreate');
        } else {
            // Show error message
            setError(result.error || 'Failed to login');
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: false
            }} />

            <Text style={styles.headerText}>Login</Text>

            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    placeholderTextColor="#C4C4C4"
                    value={Lemail}
                    onChangeText={LsetEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor="#C4C4C4"
                    value={Lpassword}
                    onChangeText={setLpassword}
                    secureTextEntry
                    editable={!loading}
                />

            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/sign-up')} disabled={loading}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

        </View>
    )
}


// StyleSheet ---------------------------------------------------------------------------------

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
    signUpText: {
        fontFamily: 'RoarGuroes',
        fontSize: 16,
        color: '#2D2D2D',
        marginTop: 15,
    },
});