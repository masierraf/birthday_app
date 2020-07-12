import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import firebase from './../utils/firebase';

onPressSignOut = () => {
  firebase.auth().signOut();
};

export default function ActionBar({showList, setShowList}) {
  return (
    <View style={styles.viewFooter}>
      <TouchableOpacity style={styles.viewSignOut} onPress={onPressSignOut}>
        <Text style={styles.text}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewAdd}
        onPress={() => setShowList(!showList)}>
        <Text style={styles.text}>{showList ? 'New Birthday' : 'Cancel'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewFooter: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  viewSignOut: {
    backgroundColor: '#820000',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewAdd: {
    backgroundColor: '#1ea1f2',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
