import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../app/firebaseConfig';

// Create the authentication context
const AuthContext = createContext({});

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    // Sign up function
    const signUp = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update user profile with display name
            if (name) {
                await updateProfile(userCredential.user, {
                    displayName: name
                });
                // Update local user state with the new display name
                setUser({ ...userCredential.user, displayName: name });
            }
            
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign in function
    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign out function
    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
