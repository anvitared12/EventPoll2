import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Stack, router, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';


export default function PollCreate() {
    const { user, signOut } = useAuth();
    const routerNav = useRouter();

    useEffect(() => {
        if (!user) {
            routerNav.replace('/Login');
        }
    }, [user]);

    const handleLogout = async () => {
        await signOut();
        routerNav.replace('/Login');
    };

    if (!user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: false
            }} />

            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome, {user.displayName || 'User'}!</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.replace('/descriptive')}>
                    <Text style={styles.buttonText}>Create a Descriptive Poll</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/option')}>
                    <Text style={styles.buttonText}>Create a Optional Poll</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


//StyleSheet -------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffff',
    },
    header: {
        position: 'absolute',
        top: 50,
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        color: '#2D2D2D',
    },
    logoutButton: {
        backgroundColor: '#D32F2F',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    logoutText: {
        fontSize: 14,
        color: '#FFF',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
});

