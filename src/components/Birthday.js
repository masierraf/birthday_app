import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

export default function Birthday({birthday, deleteOnPressBirthday}) {
  const past = birthday.days > 0 ? true : false;
  console.log(birthday);
  return (
    <TouchableOpacity
      onPress={() => deleteOnPressBirthday(birthday)}
      style={[
        styles.card,
        past ? styles.past : birthday.days == 0 ? styles.today : styles.current,
      ]}>
      <View>
        <Text style={[styles.username, past && styles.usernameDone]}>
          {birthday.firstname + ' ' + birthday.lastname}
        </Text>
        <Text style={[styles.usernameDate, past && styles.usernameDateDone]}>
          {moment(birthday.birthday).format('LL')}
        </Text>
      </View>

      <Text style={[styles.username, past && styles.usernameDone]}>
        {past
          ? ` ${Math.abs(birthday.days)} days ago`
          : birthday.days == 0
          ? 'Today'
          : `Left ${Math.abs(birthday.days)} days`}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  today: {
    backgroundColor: '#1CD760',
  },
  current: {
    backgroundColor: '#F4B400',
  },
  past: {
    borderColor: '#1CD760',
    borderWidth: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameDone: {
    color: '#fff',
  },
  usernameDate: {
    fontSize: 16,
  },
  usernameDateDone: {
    color: '#fff',
  },
});
