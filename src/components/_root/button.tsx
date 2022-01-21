import React, { useContext } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { ThemeContext } from 'src/contexts/theme';

interface Props {
  title?: string;
  onPress: () => void;
  variant?: 'outlined' | 'contained' | 'link';
  fontSize?: number;
  icon?: JSX.Element;
}

const ButtonStyled = ({
  title,
  onPress,
  variant = 'contained',
  fontSize = 20,
  icon,
}: Props) => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      margin: 10,
      textAlign: 'center',
      padding: 10,
      borderRadius: 10,
      fontSize: fontSize,
      fontWeight: 'bold',
      backgroundColor: variant === 'contained' ? colors.primary : 'transparent',
      borderColor: variant !== 'outlined' ? 'transparent' : colors.text,
      borderStyle: 'solid',
      borderWidth: 1,
      color: variant === 'contained' ? 'white' : colors.text,
    },
  });

  return (
    <Pressable onPress={() => onPress()}>
      {icon ? icon : <Text style={styles.button}>{title}</Text>}
    </Pressable>
  );
};

export default ButtonStyled;
