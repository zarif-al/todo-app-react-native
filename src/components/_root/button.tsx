import React, { useContext } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { ThemeContext } from 'src/contexts/theme';

type VariantTypes =
  | 'outlined'
  | 'contained'
  | 'link'
  | 'danger'
  | 'danger-outlined';

interface Props {
  title?: string;
  onPress: () => void;
  variant?: VariantTypes;
  fontSize?: number;
  icon?: JSX.Element;
  color?: string;
}

const ButtonStyled = ({
  title,
  onPress,
  variant = 'contained',
  fontSize = 20,
  icon,
  color,
}: Props) => {
  const { colors } = useContext(ThemeContext);

  let backgroundColor = '';
  let borderColor = '';
  let textColor = '';

  if (variant === 'outlined') {
    backgroundColor = 'transparent';
    borderColor = colors.primary;
    textColor = colors.primary;
  } else if (variant === 'contained') {
    backgroundColor = colors.primary;
    borderColor = 'transparent';
    textColor = 'white';
  } else if (variant === 'link') {
    backgroundColor = 'transparent';
    borderColor = 'transparent';
    textColor = colors.primary;
  } else if (variant === 'danger') {
    backgroundColor = colors.danger;
    borderColor = 'transparent';
    textColor = 'white';
  } else if (variant === 'danger-outlined') {
    borderColor = colors.danger;
    backgroundColor = 'transparent';
    textColor = colors.danger;
  }

  const styles = StyleSheet.create({
    button: {
      margin: 5,
      textAlign: 'center',
      padding: 10,
      borderRadius: 10,
      fontSize: fontSize,
      fontWeight: 'bold',
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderWidth: 1,
      color: color ? color : textColor,
    },
  });

  return (
    <Pressable onPress={() => onPress()}>
      {icon ? icon : <Text style={styles.button}>{title}</Text>}
    </Pressable>
  );
};

export default ButtonStyled;
