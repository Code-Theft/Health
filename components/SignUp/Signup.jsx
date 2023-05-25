import { React, useEffect, useRef, useState } from "react";
import { Button, View, Text, StyleSheet, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-paper';
import styles from './css1';
import { auth, db } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    doc,
    snapshotEqual,
    onSnapshot,
} from "firebase/firestore";

export default function SignUp({ navigation }) {
    //Poppins Font
    const [fontsLoaded] = useFonts({
        'Plight': require('../../assets/fonts/Poppins-Light.ttf'),
        'Pregular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Pmed': require('../../assets/fonts/Poppins-Medium.ttf'),
    });

    const [isAccIn, setIsAccIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [secContact, setSecContact] = useState('');
    const [age, setAge] = useState('');


    const registerWithEmailAndPassword = async (name, email, password, contact, secContact, age) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
                contact, secContact, age
            })
                .then((re) => {
                    setIsAccIn(true);
                })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        if(isAccIn === true)
        {
            navigation.navigate('AccountCreated');
            console.log("Account work ayyi;");
        }
    };

    return (
        <View style={styles.flexContainer}>
            <View style={styles.welcomeTEX2}>
                {/* <Text style={styles.welcomeH3}>Signed In</Text> */}
                <Text>
                    <Text style={styles.welcomeH1}>Sign </Text>
                    <Text style={styles.welcomeH1green}>Up </Text>
                </Text>
                <Text style={styles.welcomeCaption}>Create an account to get started.</Text>
            </View>


            <View style={styles.formStl}>

                <TextInput
                    // secureTextEntry
                    mode="outlined"
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                />
                <TextInput
                    // secureTextEntry
                    mode="outlined"
                    label="E-Mail"
                    placeholder="Enter your E-Mail"
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    left={<TextInput.Icon icon="email" />}
                />
                <TextInput
                    // secureTextEntry
                    mode="outlined"
                    label="Age"
                    placeholder="Enter your Age"
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    value={age}
                    onChangeText={setAge}
                    style={styles.input}
                    left={<TextInput.Icon icon="calendar-blank" />}
                // right={<TextInput.Icon icon="calendar-blank" />}
                />

                <TextInput
                    // secureTextEntry
                    mode="outlined"
                    label="Contact"
                    placeholder="Enter your Contact number"
                    textColor="#4d4d4d"
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    value={contact}
                    onChangeText={setContact}
                    style={styles.input}
                    left={<TextInput.Icon icon="account-box" />}
                />
                <TextInput
                    // secureTextEntry
                    mode="outlined"
                    label="Secondary Contact"
                    placeholder="Enter your Emergency contact"
                    textColor="#4d4d4d"
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    value={secContact}
                    onChangeText={setSecContact}
                    style={styles.input}
                    left={<TextInput.Icon icon="account-box" />}
                />
                <TextInput
                    // secureTextEntry
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    textColor="#4d4d4d"
                    outlineColor="#4d4d4d"
                    activeOutlineColor="#32B868"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    left={<TextInput.Icon icon="account-box" />}
                />
                <View style={styles.butContain}>
                    <Pressable
                        style={styles.getstartBut}
                        // onPress={() => navigation.navigate('Otp')}
                        onPress={async () => {
                            await registerWithEmailAndPassword(name, email, password, contact, secContact, age);

                        }}
                    >
                        <Text style={styles.getstartButex}>Create Account</Text>
                    </Pressable>
                
                    
                </View>
            </View>

            {/* -------------  Button Container  -------------- */}
            <View style={styles.bottomSpace}>


            </View>
        </View>


    );
}