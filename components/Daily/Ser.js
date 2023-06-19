import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

const Serr = () => {
  const [connectedDevice, setConnectedDevice] = useState(null);

  useEffect(() => {
    BluetoothSerial.isEnabled().then((enabled) => {
      if (!enabled) {
        BluetoothSerial.enable();
      }
    });
  }, []);

  const connectToDevice = async () => {
    try {
      const devices = await BluetoothSerial.list();
      console.log('Available devices:', devices);

      // Replace 'deviceAddress' with the address of the Bluetooth device you want to connect to
      const deviceAddress = 'XX:XX:XX:XX:XX:XX';
      await BluetoothSerial.connect(deviceAddress);

      setConnectedDevice(deviceAddress);
      console.log('Connected to device:', deviceAddress);
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const disconnectFromDevice = async () => {
    try {
      await BluetoothSerial.disconnect();
      setConnectedDevice(null);
      console.log('Disconnected from device');
    } catch (error) {
      console.error('Error disconnecting from device:', error);
    }
  };

  return (
    <View>
      <Text>Bluetooth Connection Example</Text>
      {connectedDevice ? (
        <Text>Connected to: {connectedDevice}</Text>
      ) : (
        <Text>Not connected to any device</Text>
      )}
      <Button title="Connect" onPress={connectToDevice} />
      <Button title="Disconnect" onPress={disconnectFromDevice} />
    </View>
  );
};

export default Serr;
