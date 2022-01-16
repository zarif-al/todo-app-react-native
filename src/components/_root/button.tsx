import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'outlined' | 'contained' | 'link';
}

const ButtonStyled = ({ title, onPress, variant = 'contained' }: Props) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      margin: 10,
      textAlign: 'center',
      padding: 10,
      borderRadius: 10,
      fontSize: 18,
      backgroundColor: variant === 'contained' ? colors.primary : 'transparent',
      borderColor: variant !== 'outlined' ? 'transparent' : colors.text,
      borderStyle: 'solid',
      borderWidth: 1,
      color: variant === 'contained' ? 'white' : colors.text,
    },
  });

  return (
    <Pressable onPress={() => onPress()}>
      <Text style={styles.button}>{title}</Text>
    </Pressable>
  );
};

export default ButtonStyled;
