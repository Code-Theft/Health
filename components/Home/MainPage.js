import { React, useEffect, useRef, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView, Linking, ActivityIndicator } from "react-native";
import { useFonts } from 'expo-font';
import { Divider, DataTable, Button, Avatar, Card, IconButton, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


import * as Progress from 'react-native-progress';
import * as Font from 'expo-font';

import styles from './../SignUp/css1';
// Firebase


let customFonts = {
    'Pregular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Plight': require('../../assets/fonts/Poppins-Light.ttf'),
    'Pmed': require('../../assets/fonts/Poppins-Medium.ttf'),
};


export default function DailyT({ navigation }) {
  
    useEffect(() => {
        (async () => await Font.loadAsync(customFonts))();
         }, []);

    function formatText(progress) {
        // Customize the text based on the progress value
        return `${Math.round(progress * 100)}%`;
    }

    return (


        <View style={styles.flexContainer} >



            <View style={styles.greenBoxAppHome}>

                <View style={styles.SubVV}>
                    {/* <CircularProgress/> */}
                    <Text style={styles.subVVH1}>Good Morning!</Text>
                    <Progress.Circle size={150} indeterminate={false} progress={.7} color="#1a1a1a" unfilledColor="#53AB76" borderWidth={0}
                        animated={true} showsText={true} formatText={formatText} />
                    <Text style={styles.SubVVp}>HMS Index 2</Text>
                    {/* <BApp/> */}
                </View>








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