import { React, useEffect, useRef, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen } from "react-native-screens";

// Navigation Routes
import HomeScreen from "./components/SignUp/Homescreen";
import SignUppage1 from "./components/SignUp/signuppg1";
import SignUp from "./components/SignUp/Signup";
import Otp from "./components/SignUp/Otp";
import OtpVerifed from "./components/SignUp/OtpVerifed";
import AccountCreated from "./components/SignUp/Phone";

// Home App Routes
import HomeApp from "./components/Home/HomeApp";


//Profile Routes
import HMSReport from "./components/Daily/HMSReport";
import Instruction from "./components/Daily/Instruction";
import INSRoute from "./components/Daily/INSRoute";


import { auth, db } from "./components/firebase/firebase.config";




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Check if a user is logged in or not
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return <HomeScreen />;
  }

  return (

    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={HomeApp} />
        ) : (
          <Stack.Screen name="Login" component={HomeScreen} />
        )}
        <Stack.Group>

          <Stack.Screen name="SignUppage1" component={SignUppage1} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Otp" component={Otp} />
          {/* <Stack.Screen name="OtpVerifed" component={OtpVerifed}  */}
          <Stack.Screen name="AccountCreated" component={AccountCreated} />
          {/* ------Home App Routes */}
        
          <Stack.Screen name="INSRoute" component={INSRoute} />
          <Stack.Screen name="HomeApp" component={HomeApp} />
          <Stack.Screen name="HMSReport" component={HMSReport} screenOptions={{ headerShown: true }} />

        </Stack.Group>




      </Stack.Navigator>

    </NavigationContainer >
  );
}







