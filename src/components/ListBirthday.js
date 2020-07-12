import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import moment from 'moment';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import Birthday from './Birthday';
import firebase from './../utils/firebase';
import 'firebase/firestore';
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function ListBirthday({user}) {
  const [showList, setShowList] = useState(true);
  const [birthdays, setBirthdays] = useState([]);
  const [pastBirthdays, setpastBirthdays] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setBirthdays([]);
    setpastBirthdays([]);
    db.collection(user.uid)
      .orderBy('birthday', 'asc')
      .get()
      .then(response => {
        const itemArray = [];
        response.forEach(item => {
          const data = item.data();
          data.id = item.id;
          itemArray.push(data);
        });
        splitBirthDays(itemArray);
      })
      .catch(err => {});
    setReloadData(false);
  }, [reloadData]);

  const splitBirthDays = items => {
    const currentDate = moment().set({
      minute: 0,
      second: 0,
      millisecond: 0,
      hour: 0,
    });
    const arrayTemp = [];
    const arrayPastTemp = [];

    items.forEach(item => {
      const dateBirth = new Date(item.birthday.seconds * 1000);
      const dateBirthday = moment(dateBirth);
      const currentYear = moment().get('year');
      dateBirthday.set({year: currentYear});
      const diffDate = currentDate.diff(dateBirthday, 'days');

      const itemTemp = item;
      itemTemp.birthday = dateBirthday;
      itemTemp.days = diffDate;
      if (diffDate <= 0) arrayTemp.push(itemTemp);
      else arrayPastTemp.push(itemTemp);
    });

    setBirthdays(arrayTemp);
    setpastBirthdays(arrayPastTemp);
  };

  const deleteOnPressBirthday = birthday => {
    Alert.alert(
      'Delete Birtday',
      `Are you sure about delete birthday of ${birthday.firstname} ${
        birthday.lastname
      } ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            db.collection(user.uid)
              .doc(birthday.id)
              .delete()
              .then(() => {
                setReloadData(true);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.listView}>
      {showList ? (
        <ScrollView style={styles.scrollview}>
          {birthdays.map((item, index) => (
            <Birthday
              key={index}
              birthday={item}
              deleteOnPressBirthday={deleteOnPressBirthday}
            />
          ))}

          {pastBirthdays.map((item, index) => (
            <Birthday
              key={index}
              birthday={item}
              deleteOnPressBirthday={deleteOnPressBirthday}
            />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReloadData={setReloadData}
        />
      )}
      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
}

const styles = StyleSheet.create({
  listView: {
    alignItems: 'center',
    height: '100%',
  },
  scrollview: {
    marginBottom: 50,
    width: '100%',
  },
});
