import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'RoarGuroes': require('../assets/fonts/RoarGuroes.otf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
    );
}
