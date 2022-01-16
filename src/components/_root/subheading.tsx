import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  content: string;
}

const Subheading = ({ content }: Props) => {
  return <Text style={styles.text}>{content}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 15,
    color: 'black',
  },
});

export default Subheading;
