import { React, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, ImageBackground, Pressable, ScrollView, Linking } from "react-native";
import { useFonts } from 'expo-font';
import { Divider, DataTable, Button, Avatar, Card, IconButton, Switch, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import BluetoothConnection from "./BluetoothConn";
import Wifi from "./wifi";
// import Ble from "./Ble";
// import Serr from "./Ser";



export default function DailyReading() {
  return (
    <>
        <Text>Hello</Text>
        <BluetoothConnection/>
        {/* <Wifi/><Ble/> */}
        {/* <Serr/> */}
    </>
  )
}
