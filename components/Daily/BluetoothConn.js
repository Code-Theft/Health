// import React, { useEffect } from 'react';
// import { View, Button, Text } from 'react-native';
// import BleManager from 'react-native-ble-manager';

// const BluetoothConnection = () => {
//     useEffect(() => {
//         // Initialize the BLE manager
//         BleManager.start({ showAlert: false })
//             .then(() => {
//                 // BLE manager is initialized successfully
//                 // Proceed with other operations or event listeners
//                 console.log("Suceessss")
//             })
//             .catch(error => {
//                 // Error occurred while initializing BLE manager
//                 console.log('Error initializing BLE manager:', error);
//             });

//         // Add listeners for Bluetooth state change events
//         BleManager.addListener('BleManagerDidUpdateState', handleBluetoothStateChange);

//         // Cleanup function
//         return () => {
//             BleManager.stopScan();
//             BleManager.removeAllListeners();
//         };
//     }, []);

//     const handleBluetoothStateChange = ({ state }) => {
//         if (state === 'on') {
//             // Bluetooth is turned on, start scanning for devices
//             scanDevices();
//         } else {
//             // Bluetooth is turned off, stop scanning
//             BleManager.stopScan();
//         }
//     };

//     const scanDevices = () => {
//         BleManager.scan([], 5, true) // Scan for 5 seconds
//             .then(results => {
//                 console.log('Scan results:', results);
//                 // Process the scan results and connect to a device
//                 // Here you can filter and connect to a specific device based on your requirements
//             })
//             .catch(error => {
//                 console.log('Scan error:', error);
//             });
//     };

//     return (
//         <View>
//             <Button title="Scan Devices" onPress={scanDevices} />
//             <Text>Bluetooth Connection Status</Text>
//             {/* Add UI elements to display the connection status */}
//         </View>
//     );
// };

// export default BluetoothConnection;



import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-manager';

const ESP32_SERVICE_UUID = 'YOUR_SERVICE_UUID';
const ESP32_CHARACTERISTIC_UUID = 'YOUR_CHARACTERISTIC_UUID';

const BluetoothConnection = () => {
    const [receivedData, setReceivedData] = useState('');

    const handleDataReceived = (data) => {
        setReceivedData(data);
    };

    const connectToESP32 = () => {
        BleManager.scan([], 5, true)
            .then((results) => {
                const esp32Device = results.find((device) => device.name === 'ESP32 Device');

                if (esp32Device) {
                    BleManager.connect(esp32Device.id)
                        .then(() => {
                            BleManager.retrieveServices(esp32Device.id)
                                .then((peripheralInfo) => {
                                    const services = peripheralInfo.characteristics;
                                    const esp32Service = services.find(service => service.uuid === ESP32_SERVICE_UUID);

                                    if (esp32Service) {
                                        BleManager.read(esp32Device.id, esp32Service.uuid, ESP32_CHARACTERISTIC_UUID)
                                            .then((characteristic) => {
                                                const data = characteristic.value;
                                                handleDataReceived(data);
                                            })
                                            .catch((error) => {
                                                console.log('Read error:', error);
                                            });
                                    }
                                })
                                .catch((error) => {
                                    console.log('Service discovery error:', error);
                                });
                        })
                        .catch((error) => {
                            console.log('Connection error:', error);
                        });
                }
            })
            .catch((error) => {
                console.log('Scan error:', error);
            });
    };

    return (
        <View>
            <Text>Data received: {receivedData}</Text>
            <Button title="Connect to ESP32" onPress={connectToESP32} />
        </View>
    );
};

export default BluetoothConnection;
