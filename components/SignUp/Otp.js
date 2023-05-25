import { React, useEffect, useRef, useState } from "react";
import { Button, View, Text, StyleSheet, Pressable, Card } from "react-native";
import { useFonts } from 'expo-font';
import { TextInput, IconButton, } from 'react-native-paper';

import styles from './css1';

// Firebase
import { auth } from "../firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getActionFromState } from "@react-navigation/native";



export default function Otp({ navigation }) {
    //Poppins Font
    // const [fontsLoaded] = useFonts({
    //     'Plight': require('../../assets/fonts/Poppins-Light.ttf'),
    //     'Pregular': require('../../assets/fonts/Poppins-Regular.ttf'),
    //     'Pmed': require('../../assets/fonts/Poppins-Medium.ttf'),
    // });
    // if (!fontsLoaded) {
    //     return null;
    // }
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ field: '', message: '' });

    const FormValiate = () => {
        let loginError = { field: '', message: '' };
        if (email === '') {
            loginError.field = 'email';
            loginError.message = 'Email cannot be empty';
            setError(loginError);
        }
        else {
            logInWithEmailAndPassword(email, password);
        }
    };


    const logInWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((re) => {
                    console.log(re);
                    setIsSignedIn(true);
                });
            if (isSignedIn === true) {
                navigation.navigate('HomeApp');

            }

        } catch (err) {
            alert(err.message);
        }

    };

    return (
        <View style={styles.centeredFlex}>
            <View style={styles.centerDIv}>
                <IconButton
                    icon="lock-check"
                    iconColor="#32B868"
                    size={120} />
                <Text>
                    <Text style={styles.welcomeH1}>User </Text>
                    <Text style={styles.welcomeH1green}>Login</Text>
                </Text>
                <Text style={styles.welcomeCaption1}>Login with your email and Password </Text>


            </View>
            <View style={styles.formSt2}>
                <TextInput
                    // secureTextEntry
                    mode="flat"
                    placeholder="Email"
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    left={<TextInput.Icon icon="account" />}
                    keyboardType={'email-address'}
                />
                {
                    error.field === 'email' && (
                        <Text style={styles.FormError}>{error.message}</Text>
                    )
                }
            </View>
            <View style={styles.formSt2}>
                <TextInput
                    // secureTextEntry
                    mode="flat"
                    placeholder="Password"
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    keyboardType={'default'}
                    secureTextEntry={true}

                    left={<TextInput.Icon icon="eye" />}
                />
            </View>


            {/* -------------  Button Container  -------------- */}
            <View >
                <Pressable
                    style={styles.getstartBut}
                    // onPress={() => navigation.navigate('OtpVerifed')}

                    // onPress={async () => {
                    //     FormValiate();
                    //     await logInWithEmailAndPassword(email, password);

                    // }}
                    onPress={() => FormValiate()}
                >
                    <Text style={styles.getstartButex}>Login</Text>
                </Pressable>


            </View>


        </View>

    );
}

