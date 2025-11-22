import React, { useState, useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import { router } from 'expo-router';

const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start(() => {
            // Navigate to sign-up after animation completes
            router.replace('/sign-up');
        });
    }, [fadeAnim]);

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: fadeAnim,
            }}>
            {props.children}
        </Animated.View>
    )
}

export default () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <FadeInView style={{
                width: 250,
                height: 50,

            }}>
                <Text style={{ fontSize: 30, textAlign: 'center', margin: 10, fontFamily: 'RoarGuroes' }}>
                    Event Poll
                </Text>
                <Text style={{fontSize:14, textAlign:'center'}}>A live event experience tracker</Text>
            </FadeInView>
        </View>
    )
}