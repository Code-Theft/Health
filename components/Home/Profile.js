import { React, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView, Linking } from "react-native";
import { useFonts } from 'expo-font';
import { Divider, DataTable, Button, Avatar, Card, IconButton, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



import styles from './../SignUp/css1';
// Firebase
import { auth, db } from "../firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
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



export default function Profile() {

    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [data, setData] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const uid = auth.currentUser.uid; // Get the current user's UID
                console.log("Working:", uid)
                if (uid) {
                    console.log("Working");
                    const colRef = query(collection(db, "users"), where("uid", "==", uid));
                    // const colRef = collection(db, 'users');
                    getDocs(colRef)
                    // const q = query(colRef, where("approval", "==", "false"));

                    onSnapshot(colRef, (snapshot) => {
                        const tasks = [];
                        snapshot.forEach((doc) => {
                            tasks.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        });
                        setData(tasks);
                    })
                    console.log("Data", data);
                }
                else {
                    console.log("No Data....")
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    //Poppins Font
    const [fontsLoaded] = useFonts({
        'Plight': require('../../assets/fonts/Poppins-Light.ttf'),
        'Pregular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Pmed': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }

    const navigation = useNavigation();
    const logout = async () => {
        await signOut(auth)
            .then(() => {
                console.log("Logging Out Success");
                setIsLoggedOut(true);

            });
        if (isLoggedOut === true) {

            navigation.navigate('Otp');
        }
    };

    const emaill = () => {
        Linking.openURL('mailto:support@hms.dev');
    };

    return (
        <View style={styles.flexContainer}>



            <View style={styles.greenBox}>
                <View style={styles.VvCon}>
                    <View style={styles.SubVV}>
                        <Image
                            style={styles.greenBoxImg1}
                            source={require('../../assets/account.png')}
                            resizeMethod="scale" />
                    </View>


                </View>
                {/* {data.map(row => (
                    <View style={styles.VvCon1} key={row.uid}>
                        <Text style={styles.ProffName}>{row.name}</Text>
                        <Text style={styles.ProffEmail}>{row.email}</Text>
                        <Text style={styles.ProffDate}>
                            <Text>UID : </Text>
                            <Text>{row.uid}</Text>
                        </Text>
                    </View>
                ))} */}




            </View>


            {/* ---------------- Landing Body Section ------------- */}

            <View style={styles.welcomeTEX}>

                <Card.Title
                    title="HMS Report"
                    // subtitle="Measure your body temperature"
                    left={(props) => <Avatar.Icon {...props} icon="chart-bar" style={styles.green} />}
                    right={(props) => <IconButton {...props} icon="download" onPress={() => { }} />}
                />
                <Card.Title
                    title="Survey Report"
                    // subtitle="Measure your body temperature"
                    left={(props) => <Avatar.Icon {...props} icon="script-text" style={styles.green} />}
                    right={(props) => <IconButton {...props} icon="download" onPress={() => { }} />}
                />

            </View>
            {/* -------------  Button Container  -------------- */}
            <View style={styles.butContain}>
                <DataTable>


                    <DataTable.Row>
                        <DataTable.Cell>
                            <Button icon="face-agent" mode="outlined" onPress={() => emaill()} textColor="#666"  >
                                Support
                            </Button>
                        </DataTable.Cell>


                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>
                            <Button icon="logout" mode="text" style={styles.profileDash} textColor="#666" buttonColor="#59F397" onPress={() => logout()}>
                                Log Out
                            </Button>
                        </DataTable.Cell>


                    </DataTable.Row>



                </DataTable>

            </View>

        </View>
    );
}