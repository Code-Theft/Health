import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const Wifi = () => {
  useEffect(() => {
    // Function to send data to the ESP32
    const sendDataToESP32 = async () => {
      try {
        const response = await axios.get('http://192.168.1.63/');
        console.log('Data sent to ESP32');
        console.log(response.data);
      } catch (error) {
        console.error('Error sending data to ESP32:', error);
      }
    };

    // Call the sendDataToESP32 function
    sendDataToESP32();
  }, []);

  return (
    <View>
      <Text>React Native App</Text>
    </View>
  );
};

export default Wifi;
