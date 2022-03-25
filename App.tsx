import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import Routes from './app/routes';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <Routes />
  );
};

const styles = StyleSheet.create({

});

export default App;
