import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView } from "react-native";
import { Card, Button, Avatar, Text } from "react-native-paper";
import { useFonts } from 'expo-font';
import styles from './../SignUp/css1';




const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


export default function ProHero({ navigation }) {

    const [topics, setTopics] = useState([]);
    

    useEffect(() => {
        fetch('https://health.gov/myhealthfinder/api/v3/topicsearch.json')
            .then(response => response.json())
            .then(data => setTopics(data.Topics))
            .catch(error => console.error(error));
    }, []);

   console.log("Hello");
    // console.log(setTopics);
    console.log(topics);
   
    
    
    return (

        <View>
            <Card style={styles.CommCard}>
                <Card.Title title="Plum" subtitle="Info on Plum Cake" left={LeftContent} />

                <Card.Content style={styles.CardLeftAlign}>
            {/* <Text variant="titleLarge">Plum Cakes 2</Text> */}
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.CardCoverImg} />
                    <Text variant="bodyMedium">
                        Pancakes are ideal for many people who are losing weight because they are coded in a dry frying pan withourt adding
                        oil during frying, which reduces the calories content of the finished dish and its carcinogenic properties.
                    </Text>
                </Card.Content>

            </Card>


            {/* <View>
                <Text>Topics:</Text>
                {topics.map(topic => (
                    <Text key={topic.Id}>{topic.Title}</Text>
                ))}
            </View> */}
        </View>








    );
}