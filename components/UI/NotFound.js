import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotFound = ({ text }) => {
  return (
    <View style={styles.viewStyle}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotFound;
