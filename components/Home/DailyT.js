import { React, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView, Linking } from "react-native";
import { useFonts } from 'expo-font';
import { Divider, DataTable, Button, Avatar, Card, IconButton, Switch, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as Progress from 'react-native-progress';


import styles from './../SignUp/css1';
// Firebase


export default function DailyT({ navigation }) {

    const [progress, setProgress] = useState(0);
    const [cardArray, setCardArray] = useState(CardArray);


    const CardArray = [
        { name: 'Temperature', subtitle: 'Measure your Body Temperature', Licon: 'temperature-celsius', Ricon: 'close' },
        { name: 'SP O2', subtitle: 'Measure your Oxygen Saturation level', Licon: 'molecule', Ricon: 'close' },
        { name: 'Pressure', subtitle: 'Measure your Blood Pressure', Licon: 'water', Ricon: 'close' },
        { name: 'Heart Rate', subtitle: 'Measure your Oxygen saturation level', Licon: 'heart', Ricon: 'check', }
    ];

    const updateRiconToCheck = (index) => {
        // Create a new array with updated Ricon value
        const updatedCardArray = [...cardArray];
        updatedCardArray[index].Ricon = 'check';

        setCardArray(updatedCardArray); // Update the state with the new array
    };



    useEffect(() => {
        const checkCount = CardArray.reduce((count, card) => {
            if (card.Ricon === 'check') {
                return count + 1;
            }
            return count;
        }, 0);

        const progressValue = checkCount / 4;
        setProgress(progressValue);



    }, []);


    const formatText = (progress) => {
        // Customize the text based on the progress value
        return `${Math.round(progress * 100)}%`;
    };



    return (
        <View style={styles.flexContainer}>



            <View style={styles.greenBox}>

                <View style={styles.SubVV}>
                    {/* <CircularProgress/> */}
                    <Text style={styles.subVVH1}>Daily Task </Text>
                    <Progress.Circle size={150} indeterminate={false} progress={progress} color="#1a1a1a" unfilledColor="#53AB76" borderWidth={0}
                        animated={true} showsText={true} formatText={formatText} />
                    <Text style={styles.SubVVp}>
                        <Text>You have completed {progress*4} / 4</Text>
                        <Text> Tasks </Text>
                    </Text>
                    
                </View>
            </View>


            {/* ---------------- Landing Body Section ------------- */}

            <View style={styles.welcomeTEX3}>

                {CardArray.map((row, index) => (
                    <Card key={index} style={styles.cardss}>
                        <Card.Title
                            title={row.name}
                            subtitle={row.subtitle}
                            left={(props) => <Avatar.Icon {...props} icon={row.Licon}
                                style={styles.green} />}
                            right={(props) => (
                                <IconButton {...props} icon={row.Ricon} style={row.Ricon === 'check' ? styles.green : styles.red} />
                            )}
                        />
                    </Card>
                ))}
               


            </View>
            {/* -------------  Button Container  -------------- */}
            <View style={styles.butContain}>
                <Pressable
                    style={styles.getstartBut}
                // onPress={() => navigation.navigate('SignUppage1')} 
                >
                    <Text style={styles.getstartButex}>Complete Now</Text>
                </Pressable>
                              
            </View>

        </View>
    );
}