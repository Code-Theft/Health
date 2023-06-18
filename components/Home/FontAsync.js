import * as Font from 'expo-font';
import { React, useEffect, useRef, useState } from "react";

let customFonts = {
    'Pregular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Plight': require('../../assets/fonts/Poppins-Light.ttf'),
    'Pmed': require('../../assets/fonts/Poppins-Medium.ttf'),
};

export default FontAsync= ()=>{
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFontsAsync = async () => {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
    };

    useEffect(() => {
        loadFontsAsync();
    }, []);

    if (!fontsLoaded) {
        return null;
      }

};

