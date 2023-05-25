import * as React from 'react';
import { Avatar, Card, IconButton, Button } from 'react-native-paper';
import styles from '../SignUp/css1';
import { View, Text, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView } from "react-native";
import { useFonts } from 'expo-font';


const DailyTask = () => {
    const [fontsLoaded] = useFonts({
        'Plight': require('../../assets/fonts/Poppins-Light.ttf'),
        'Pregular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Pmed': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }
    
    return (
        <View >
            
            <View style={styles.fthree}>
                <Text>Hello</Text>
                <Card.Title
                    title="Temperature"
                    subtitle="Measure your body temperature"
                    left={(props) => <Avatar.Icon {...props} icon="temperature-celsius" style={styles.green}/>}
                    right={(props) => <IconButton {...props} icon="check" style={styles.green} onPress={() => { }} />}
                />
                <Card.Title
                    title="Hear Beat Rate"
                    subtitle="Measure your Heart beat rate"
                    left={(props) => <Avatar.Icon {...props} icon="heart" style={styles.green}/>}
                    right={(props) => <IconButton {...props} icon="close" style={styles.red} onPress={() => { }} />}
                />
                <Card.Title
                    title="ECG"
                    subtitle="Measure your Electrocardiogram (ECG)"
                    left={(props) => <Avatar.Icon {...props} icon="water" style={styles.green}/>}
                    right={(props) => <IconButton {...props} icon="check" style={styles.green} onPress={() => { }} />}
                />
                <Card.Title
                    title="SP O2"
                    subtitle="Measure your Oxygen Saturation Level"
                    left={(props) => <Avatar.Icon {...props} icon="temperature-celsius" style={styles.green}/>}
                    right={(props) => <IconButton {...props} icon="check" style={styles.green} onPress={() => { }} />}
                />
            </View>
            <View style={styles.fone}>
              
            </View>
            

        </View>


    );
}

export default DailyTask;


