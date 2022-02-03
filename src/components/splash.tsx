import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ThemeContext } from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';
import { Icon } from 'react-native-elements';

const Splash = () => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    primaryText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subText: {
      color: colors.text,
      fontSize: 15,
      textAlign: 'center',
      paddingHorizontal: 50,
      marginTop: 15,
    },
    logo: {
      marginBottom: 15,
    },
  });
  return (
    <View style={styles.container}>
      <Circles />
      <Icon
        name="list"
        type="feather"
        size={100}
        color={colors.background2}
        containerStyle={styles.logo}
      />
      <Text style={styles.primaryText}>Get Things Done With ToDo</Text>
      <Text style={styles.subText}>
        Improve your daily output by organising yourself with this app.
      </Text>
    </View>
  );
};

export default Splash;
