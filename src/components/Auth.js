import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import Logo from './../assets/img/logo.png';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const changeLoginFlag = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.formView}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>{isLogin ? 'Log in' : 'Register'}</Text>
      {isLogin ? (
        <LoginForm changeLoginFlag={changeLoginFlag} />
      ) : (
        <RegisterForm changeLoginFlag={changeLoginFlag} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    height: '30%',
    width: '80%',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
