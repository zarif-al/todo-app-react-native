import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {AuthContext} from 'src/contexts/auth';
import {ThemeContext} from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';

const HomeScreenComponent = () => {
  const {signOut, user} = useContext(AuthContext);
  const {colors} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20,
      backgroundColor: colors.background,
    },
    firstContainer: {
      padding: 15,
      borderWidth: 3,
      margin: 5,
      marginBottom: 10,
      color: 'white',
      borderRadius: 10,
      borderColor: 'white',
    },
    secondContainer: {
      marginTop: 6,
      flexDirection: 'row',
    },
    text: {
      fontSize: 18,
      marginBottom: 5,
      color: 'white',
    },
    heading: {
      fontSize: 30,
      color: 'white',
      fontFamily: 'sans-serif-condensed',
      marginBottom: 10,
    },
  });
  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.firstContainer}>
        <Text style={styles.heading}>Your Profile</Text>
        <View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Username : </Text>
            <Text style={styles.text}>{user?.userName}</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Name : </Text>
            <Text style={styles.text}>
              {user?.firstName + ' ' + user?.lastName}
            </Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Email : </Text>
            <Text style={styles.text}>{user?.email}</Text>
          </View>
        </View>
      </View>
      <Button title="Sign Out !" onPress={() => signOut()} />
    </View>
  );
};

export default HomeScreenComponent;
