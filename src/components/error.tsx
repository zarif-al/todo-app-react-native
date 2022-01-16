import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorScreenComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Error Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
export default ErrorScreenComponent;
