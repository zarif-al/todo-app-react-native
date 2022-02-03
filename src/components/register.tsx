import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AuthContext } from 'src/contexts/auth';
import { ThemeContext } from 'src/contexts/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/App';
import { useNavigation } from '@react-navigation/native';
import {
  Header,
  ButtonStyled,
  Subheading,
  TextInputStyled,
} from 'src/components/_root';
import Circles from 'src/components/_root/circles';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register = () => {
  const navigation = useNavigation<Props['navigation']>();
  const [email, setEmail] = useState('zarif_al96@outlook.com');
  const [password, setPassword] = useState('As123456789');
  const { createFirebaseUser, error, setError } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    text: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 40,
    },
    input: {
      height: 40,
      borderWidth: 1,
      marginVertical: 5,
    },
    form: {
      margin: 12,
      width: '70%',
    },
    signUpBtn: {
      width: '50%',
    },
    navigationLink: {
      width: '70%',
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
      <Header content="Welcome Onboard" color={colors.text} />
      <Subheading content="Lets help you meet your tasks." />
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
      <View style={styles.signUpBtn}>
        <ButtonStyled
          title="Sign Up !"
          onPress={() => {
            if (email && password) {
              createFirebaseUser(email, password);
            } else {
              setError('Please fill all the fields');
            }
          }}
          fontSize={18}
        />
      </View>
      <View style={styles.navigationLink}>
        <ButtonStyled
          title="Already Have an Account?"
          variant="link"
          color={colors.text}
          onPress={() => {
            setError(null);
            navigation.navigate('Login');
          }}
          fontSize={15}
        />
      </View>
    </View>
  );
};

export default Register;
