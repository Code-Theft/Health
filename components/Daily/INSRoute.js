import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Instruction from './Instruction';
import DailyReading from './DailyReading';


const Stack = createNativeStackNavigator();

export default function INSRoute() {
    return (
        <Stack.Navigator initialRouteName='INs' screenOptions={{ headerShown: false }} >
          <Stack.Screen name="INs" component={Instruction} />
          <Stack.Screen name="Reading" component={DailyReading} />
        
        </Stack.Navigator>
      );
}




