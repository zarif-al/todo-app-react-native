import React, {useContext} from 'react';
import {View, Text, StyleSheet /* Button */} from 'react-native';
/* import {AuthContext} from 'src/contexts/auth'; */
import {ThemeContext} from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';

const HomeScreenComponent = () => {
  /*   const {signOut, user} = useContext(AuthContext); */
  const {colors} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
    },
    firstContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background2,
    },
    secondContainer: {
      marginTop: 6,
      flexDirection: 'row',
      backgroundColor: 'red',
      flex: 0.5,
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
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.heading}>Your Profile</Text>
      </View>
      {/*  <Button title="Sign Out !" onPress={() => signOut()} /> */}
    </View>
  );
};

export default HomeScreenComponent;
