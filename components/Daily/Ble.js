import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    NativeModules,
    useColorScheme,
    TouchableOpacity,
    NativeEventEmitter,
    PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);


const Ble = () => {
    const peripherals = new Map();
    const [isScanning, setIsScanning] = useState(false);
    const [connected, setConnected] = useState(false);
    const [bluetoothDevices, setBluetoothDevices] = useState([]);


    
    useEffect(() => {
        // turn on bluetooth if it is not on
        BleManager.enableBluetooth().then(() => {
            console.log('Bluetooth is turned on!');
        });
        // start bluetooth manager
        BleManager.start({ showAlert: false }).then(() => {
            console.log('BLE Manager initialized');
        });
        let stopListener = BleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                setIsScanning(false);
                console.log('Scan is stopped');
                handleGetConnectedDevices();
            },
        );
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(result => {
                if (result) {
                    console.log('Permission is OK');
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    ).then(result => {
                        if (result) {
                            console.log('User accept');
                        } else {
                            console.log('User refuse');
                        }
                    });
                }
            });
        }
        return () => {
            stopListener.remove();
        };
    }, []);
    const startScan = () => {
        if (!isScanning) {
            BleManager.scan([], 5, true)
                .then(() => {
                    setIsScanning(true);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };
    const handleGetConnectedDevices = () => {
        BleManager.getConnectedPeripherals([]).then(results => {
            if (results.length == 0) {
                console.log('No connected bluetooth devices');
            } else {
                for (let i = 0; i < results.length; i++) {
                    let peripheral = results[i];
                    peripheral.connected = true;
                    peripherals.set(peripheral.id, peripheral);
                    setConnected(true);
                    setBluetoothDevices(Array.from(peripherals.values()));
                }
            }
        });
    };
    const connectToPeripheral = peripheral => {
        if (peripheral.connected) {
            BleManager.disconnect(peripheral.id).then(() => {
                peripheral.connected = false;
                setConnected(false);
                alert(`Disconnected from ${peripheral.name}`);
            });
        } else {
            BleManager.connect(peripheral.id)
                .then(() => {
                    let peripheralResponse = peripherals.get(peripheral.id);
                    if (peripheralResponse) {
                        peripheralResponse.connected = true;
                        peripherals.set(peripheral.id, peripheralResponse);
                        setConnected(true);
                        setBluetoothDevices(Array.from(peripherals.values()));
                    }
                    alert('Connected to ' + peripheral.name);
                })
                .catch(error => console.log(error));
            /* Read current RSSI value */
            setTimeout(() => {
                BleManager.retrieveServices(peripheral.id).then(peripheralData => {
                    console.log('Peripheral services:', peripheralData);
                });
            }, 900);
        }
    };
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    // render list of bluetooth devices
    const RenderItem = ({ peripheral }) => {
        const color = peripheral.connected ? 'green' : '#fff';
        return (
            <>
                <Text
                    style={{
                        fontSize: 20,
                        marginLeft: 10,
                        marginBottom: 5,
                        color: isDarkMode ? Colors.white : Colors.black,
                    }}>
                    Nearby Devices:
                </Text>
                <TouchableOpacity onPress={() => connectToPeripheral(peripheral)}>
                    <View
                        style={{
                            backgroundColor: color,
                            borderRadius: 5,
                            paddingVertical: 5,
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                textTransform: 'capitalize',
                                color: connected ? Colors.white : Colors.black,
                            }}>
                            {peripheral.name}
                        </Text>
                        <View
                            style={{
                                backgroundColor: color,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: connected ? Colors.white : Colors.black,
                                }}>
                                RSSI: {peripheral.rssi}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: connected ? Colors.white : Colors.black,
                                }}>
                                ID: {peripheral.id}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    };
    return (
        <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                style={backgroundStyle}
                contentContainerStyle={styles.mainBody}
                contentInsetAdjustmentBehavior="automatic">
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                        marginBottom: 40,
                    }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                                color: isDarkMode ? Colors.white : Colors.black,
                            }}>
                            React Native BLE Manager Tutorial
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={startScan}>
                        <Text style={styles.buttonTextStyle}>
                            {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* list of scanned bluetooth devices */}
                {bluetoothDevices.map(device => (
                    <View key={device.id}>
                        <RenderItem peripheral={device} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        height: windowHeight,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});
export default Ble;