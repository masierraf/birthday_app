import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from './../utils/firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebase);

export default function AddBirthday({user, setShowList, setReloadData}) {
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState(defaultValues());
  const [formError, setFormError] = useState({});

  const hideDatePicker = () => {
    setisDatePickerVisible(false);
  };
  const showDatePicker = () => {
    setisDatePickerVisible(true);
  };
  const handleConfirm = date => {
    const birthday = date;
    setFormData({...formData, birthday: birthday});
    hideDatePicker();
  };

  const onChange = (e, type) => {
    console.log(formData);
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const onSubmit = () => {
    let error = {};

    if (!formData.firstname || !formData.lastname || !formData.birthday) {
      if (!formData.firstname) error.firstname = true;
      if (!formData.lastname) error.lastname = true;
      if (!formData.birthday) error.birthday = true;
    } else {
      const data = {...formData};
      console.log(data);
      data.birthday.setYear(0);
      db.collection(user.uid)
        .add(data)
        .then(() => {
          setShowList(true);
          setReloadData(true);
        })
        .catch(err => console.log(err));
    }
    setFormError(error);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.firstname && styles.error]}
          placeholder="Fist Name"
          placeholderTextColor="#969696"
          onChange={e => onChange(e, 'firstname')}
        />
        <TextInput
          style={[styles.input, formError.lastname && styles.error]}
          placeholder="Last Name"
          placeholderTextColor="#969696"
          onChange={e => onChange(e, 'lastname')}
        />
        <View
          style={[
            styles.input,
            styles.datepicker,
            formError.birthday && styles.error,
          ]}>
          <Text
            style={[
              styles.textDate,
              formData.birthday && styles.textDateSelected,
            ]}
            onPress={showDatePicker}>
            {formData.birthday
              ? moment(formData.birthday).format('LL')
              : 'Date Birth'}
          </Text>
        </View>
        <Button title="Create Birthday" onPress={onSubmit} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

function defaultValues() {
  return {
    firstname: '',
    lastname: '',
    birthday: '',
  };
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  datepicker: {
    justifyContent: 'center',
  },
  textDate: {
    color: '#969696',
    fontSize: 18,
  },
  textDateSelected: {
    color: 'white',
  },
  error: {
    borderColor: 'red',
  },
});
