import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import firebase from './../utils/firebase';

import {validateEmail} from './../utils/validations';

export default function RegisterForm({changeLoginFlag}) {
  const [formData, setFormData] = useState(defaultValues());
  const [errors, setErrors] = useState({});
  const onPressBack = () => {
    changeLoginFlag();
  };

  const onPressRegister = () => {
    let error = {};
    const {password, repeatPassword, email} = formData;
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) error.email = true;
      if (!formData.password) error.password = true;
      if (!formData.repeatPassword) error.repeatPassword = true;
      error.message = 'Empty field';
    } else if (!validateEmail(email)) {
      error.email = true;
      error.message = 'Email is not valid';
    } else if (password !== repeatPassword) {
      error.repeatPassword = true;
      error.message = "Password doesn't match";
    } else if (password.length < 6) {
      error.password = true;
      error.message = 'More than 6 characters for password';
    } else {
      console.log('test');
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err =>
          setErrors({
            email: true,
            password: true,
            repeatPassword: true,
            massage: 'Error al crear la cuenta',
          }),
        );
    }

    setErrors(error);
  };

  return (
    <>
      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.error]}
        textContentType="emailAddress"
        placeholderTextColor="#969696"
        onChangeText={e => setFormData({...formData, email: e})}
        autoFocus
        autoCompleteType="email"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      {errors.message && errors.email && (
        <Text style={styles.errorText}>{errors.message}</Text>
      )}
      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password && styles.error]}
        textContentType="password"
        secureTextEntry={true}
        placeholderTextColor="#969696"
        onChangeText={e => setFormData({...formData, password: e})}
      />
      {errors.message && errors.password && (
        <Text style={styles.errorText}>{errors.message}</Text>
      )}
      <TextInput
        placeholder="Repeat Password"
        style={[styles.input, errors.repeatPassword && styles.error]}
        textContentType="password"
        secureTextEntry={true}
        placeholderTextColor="#969696"
        onChangeText={e => setFormData({...formData, repeatPassword: e})}
      />
      {errors.message && errors.repeatPassword && (
        <Text style={styles.errorText}>{errors.message}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={onPressRegister}>
        <Text style={styles.label}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.formFooter}>
        <TouchableOpacity style={styles.button} onPress={onPressBack}>
          <Text style={styles.label}>Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValues() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    color: 'white',
    fontSize: 24,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    borderRadius: 40,
    width: '50%',
    backgroundColor: 'red',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  input: {
    width: '80%',
    borderRadius: 30,
    color: '#fff',
    backgroundColor: '#1e3040',
    height: 60,
    paddingHorizontal: 20,
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#1e3040',
    marginBottom: 10,
  },
  errorText: {
    fontStyle: 'italic',
    color: 'red',
  },
  formFooter: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Platform.OS === 'android' ? 20 : 5,
  },
  error: {
    borderColor: 'red',
  },
});
