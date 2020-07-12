import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {validateEmail} from './../utils/validations';
import firebase from './../utils/firebase';

export default function LoginForm({changeLoginFlag}) {
  const [formData, setFormData] = useState(defaultValues());
  const [errors, setErrors] = useState({});
  const onPressRegister = () => {
    changeLoginFlag();
  };

  const onPressLogin = () => {
    let error = {};
    const {email, password} = formData;
    console.log(formData);
    if (!email && !password) {
      if (!email) error.email = true;
      if (!password) error.password = true;
    } else if (!validateEmail(email)) {
      error.email = true;
      error.message = 'Invalid email';
    } else if (password < 6) {
      error.password = true;
      error.message = 'More than 6 charactes needed';
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          alert('Inicio de sesión');
        })
        .catch(err => {
          alert(err);
        });
    }
    setErrors(error);
  };

  return (
    <>
      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.error]}
        placeholderTextColor="#969696"
        autoFocus
        autoCompleteType="email"
        textContentType="emailAddress"
        autoCapitalize="none"
        onChangeText={e => setFormData({...formData, email: e})}
      />
      {errors.message && errors.email && (
        <Text style={styles.errorText}>{errors.message}</Text>
      )}
      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password && styles.error]}
        placeholderTextColor="#969696"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={e => setFormData({...formData, password: e})}
      />
      {errors.message && errors.password && (
        <Text style={styles.errorText}>{errors.message}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={onPressLogin}>
        <Text style={styles.label}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.formFooter}>
        <TouchableOpacity style={styles.button} onPress={onPressRegister}>
          <Text style={styles.label}>Register</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValues() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 24,
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
  formFooter: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Platform.OS === 'android' ? 20 : 5,
  },
  errorText: {
    fontStyle: 'italic',
    color: 'red',
  },
  error: {
    borderColor: 'red',
  },
});
