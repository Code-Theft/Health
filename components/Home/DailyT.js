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
    if (!fontsLoaded) {
        return null;
    }
    const formatText = (progress) => {
        // Customize the text based on the progress value
        return `${Math.round(progress * 100)}%`;
      };

    return (
        <View style={styles.flexContainer}>



            <View style={styles.greenBox}>
                
                    <View style={styles.SubVV}>
                        {/* <CircularProgress/> */}
                        <Text style={styles.subVVH1}>Daily Task</Text>
                        <Progress.Circle size={150} indeterminate={false} progress={.7} color="#1a1a1a" unfilledColor="#53AB76" borderWidth={0} 
                         animated={true} showsText={true} formatText={formatText} />
                         <Text style={styles.SubVVp}>You have completed 3/4 Tasks</Text>
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
                    title="SP O2"
                    subtitle="Measure your Oxygen Saturation Level"
                    left={(props) => <Avatar.Icon {...props} icon="molecule" style={styles.green} />}
                    right={(props) => <IconButton {...props} icon="check" style={styles.green} onPress={() => { }} />}
                />
                <Card.Title
                    title="Body Temperature"
                    subtitle="Measure your Body Temperature"
                    left={(props) => <Avatar.Icon {...props} icon="temperature-celsius" style={styles.green} />}
                    right={(props) => <IconButton {...props} icon="check" style={styles.green} onPress={() => { }} />}
                />
                <Card.Title
                    title="Blood Pressure"
                    subtitle="Measure your Blood Pressure"
                    left={(props) => <Avatar.Icon {...props} icon="water" style={styles.green} />}
                    right={(props) => <IconButton {...props} icon="close" style={styles.red} onPress={() => { }} />}
                />
                <Card.Title
                    title="Heart Beat Rate"
                    subtitle="Measure your Heart Beat Rate"
                    left={(props) => <Avatar.Icon {...props} icon="heart" style={styles.green} />}
                    right={(props) => <IconButton {...props} icon="check" style={styles.green} onPress={() => { }} />}
                />

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