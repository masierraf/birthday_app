import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Button,
  YellowBox,
} from 'react-native';
import {decode, encode} from 'base-64';

import Auth from './src/components/Auth';

import firebase from './src/utils/firebase';
import 'firebase/auth';
import LoginForm from './src/components/LoginForm';
import ListBirthday from './src/components/ListBirthday';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      console.log(response);
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.mainContainer}>
        {user ? <ListBirthday user={user} /> : <Auth />}
      </SafeAreaView>
    </>
  );
}

function Logout({onPressLogout}) {
  return (
    <View>
      <Text>Hola mundo</Text>
      <Button title="Log out" onPress={onPressLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#15212b',
    height: '100%',
  },
  error: {
    borderColor: 'red',
  },
});
