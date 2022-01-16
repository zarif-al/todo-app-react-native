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
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 5,
  },
});

export default Header;
