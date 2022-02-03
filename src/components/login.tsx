import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AuthContext } from 'src/contexts/auth';
import {
  Header,
  ButtonStyled,
  Subheading,
  TextInputStyled,
} from 'src/components/_root';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/App';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = () => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation<Props['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, error, setError } = useContext(AuthContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    form: {
      justifyContent: 'center',
      width: '70%',
      margin: 12,
    },
    buttonContainer: {
      width: '50%',
    },
    errorText: {
      marginTop: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15,
      color: colors.danger,
    },
  });

  return (
    <View style={styles.container}>
      <Circles />
      <Header content="Welcome Back" color={colors.text} />
      <Subheading content="Please login to continue" />
      <View style={styles.form}>
        <TextInputStyled
          setValue={setEmail}
          value={email}
          placeholder="Email"
          autoComplete="email"
          error={error ? true : false}
        />
        <TextInputStyled
          setValue={setPassword}
          value={password}
          placeholder="Password"
          autoComplete="password"
          error={error ? true : false}
          secureTextEntry={true}
        />
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonStyled
          title="Login"
          onPress={() => {
            if (email && password) {
              signIn(email, password);
            } else {
              setError('Please fill all the fields');
            }
          }}
          fontSize={18}
        />
      </View>
      <ButtonStyled
        title="New Here?"
        color={colors.text}
        onPress={() => {
          setError(null);
          navigation.navigate('Register');
        }}
        variant="link"
        fontSize={15}
      />
    </View>
  );
};

export default Login;
