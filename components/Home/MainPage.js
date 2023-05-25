import { React, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView, Linking } from "react-native";
import { useFonts } from 'expo-font';
import { Divider, DataTable, Button, Avatar, Card, IconButton, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CircularProgress from "./Circle";
import * as Progress from 'react-native-progress';

import styles from './../SignUp/css1';
// Firebase




export default function DailyT() {






    //Poppins Font
    const [fontsLoaded] = useFonts({
        'Plight': require('../../assets/fonts/Poppins-Light.ttf'),
        'Pregular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Pmed': require('../../assets/fonts/Poppins-Medium.ttf'),
    });

    const formatText = (progress) => {
        // Customize the text based on the progress value
        return `${Math.round(progress * 100)}%`;
    };

    return (
        <View style={styles.flexContainer}>



            <View style={styles.greenBoxAppHome}>

                <View style={styles.SubVV}>
                    {/* <CircularProgress/> */}
                    <Text style={styles.subVVH1}>Good Morning!</Text>
                    <Progress.Circle size={150} indeterminate={false} progress={.7} color="#1a1a1a" unfilledColor="#53AB76" borderWidth={0}
                        animated={true} showsText={true} formatText={formatText} />
                    <Text style={styles.SubVVp}>HMS Index</Text>
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

            <View style={styles.welcomeTEXHomeApp}>
                
                   
                    <View style={styles.container1}>
                        <View style={styles.row1}>
                            <View style={styles.card1} />
                            <View style={styles.card1} />
                            <View style={styles.card1} />
                        </View>
                        <View style={styles.row1}>
                            <View style={styles.card1} />
                            <View style={styles.card1} />
                            <View style={styles.card1} />
                        </View>
                       
                    </View>

               


            </View>
            {/* -------------  Button Container  -------------- */}
            <View style={styles.butContain}>
                <Pressable
                    style={styles.getstartBut}
                    onPress={() => navigation.navigate('SignUppage1')} >
                    <Text style={styles.getstartButex}>Complete Now</Text>
                </Pressable>

            </View>

        </View>
    );
}