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
}

const ButtonStyled = ({
  title,
  onPress,
  variant = 'contained',
  fontSize = 20,
  icon,
}: Props) => {
  const { colors } = useContext(ThemeContext);

  let backgroundColor = colors.primary;
  let borderColor = 'transparent';
  let textColor = colors.primary;

  if (
    variant === 'outlined' ||
    variant === 'link' ||
    variant === 'danger-outlined'
  ) {
    backgroundColor = 'transparent';
    if (variant === 'danger-outlined') {
      borderColor = colors.danger;
      textColor = colors.danger;
    } else {
      borderColor = colors.primary;
    }
  } else if (variant === 'contained') {
    backgroundColor = colors.primary;
    textColor = 'white';
  } else if (variant === 'danger') {
    backgroundColor = colors.danger;
    textColor = 'white';
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
      color: textColor,
    },
  });

  return (
    <Pressable onPress={() => onPress()}>
      {icon ? icon : <Text style={styles.button}>{title}</Text>}
    </Pressable>
  );
};

export default ButtonStyled;
