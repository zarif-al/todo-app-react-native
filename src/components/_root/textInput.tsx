import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ThemeContext } from 'src/contexts/theme';

interface Props {
  setValue: (value: string) => void;
  value: string;
  autoComplete?: 'name' | 'username' | 'email' | 'password' | 'off';
  placeholder?: string;
  error?: boolean;
  secureTextEntry?: boolean;
}

const TextInputStyled = ({
  setValue,
  value,
  autoComplete = 'off',
  placeholder,
  error = false,
  secureTextEntry = false,
}: Props) => {
  const { colors } = useContext(ThemeContext);
  const [focused, setFocused] = useState(false);

  const styles = StyleSheet.create({
    input: {
      marginTop: 10,
      borderWidth: 1,
      fontSize: 15,
      borderRadius: 10,
      color: error ? colors.warning : colors.secondary,
      borderColor: error ? colors.warning : focused ? colors.primary : '#ccc',
    },
  });

  return (
    <TextInput
      style={styles.input}
      onChangeText={setValue}
      value={value}
      autoComplete={autoComplete}
      placeholderTextColor="grey"
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      textAlign="center"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export default TextInputStyled;
