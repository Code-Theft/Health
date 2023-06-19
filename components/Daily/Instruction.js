import { React, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView, Linking, Platform } from "react-native";
import styles from './../SignUp/css1';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import ProfFoot from "./ProfFoot";
import ProfReport from "./ProfReport";
// import { BarApp } from "./BarChart";







export default function Instruction({navigation}) {

 
    return (
        <View style={styles.flexContainer}>

            
            <View style={styles.VvCon}>

                <View style={styles.greenBox}>


                    <View style={styles.SubVV}>
                        <Text>Instructions</Text>
                    </View>


                </View>




            </View>
            <View style={styles.welcomeTEX}>

                <Text>Hello Myre</Text>
                <Text>Enable Bluetooth</Text>
                <Text>Ensure ECG Connection</Text>
                {/* <BarApp/> */}
            </View>

            <View style={styles.butContain}>
                <Pressable
                    style={styles.getstartBut}
                    onPress={() => navigation.navigate("Reading")}
                >
                    <Text style={styles.getstartButex}>Start Checking</Text>
                </Pressable>


            </View>




        </View>
    )
}
