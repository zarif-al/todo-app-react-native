import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  content: string;
  color: string;
}

const Header = ({ content, color }: Props) => {
  return <Text style={{ ...styles.text, color: color }}>{content}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
    zIndex: 10,
  },
});

export default Header;
