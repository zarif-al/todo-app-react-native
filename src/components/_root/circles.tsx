import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from 'src/contexts/theme';

const Circles = () => {
  const {colors} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    circleOne: {
      backgroundColor: colors.primary,
      width: 200,
      height: 200,
      borderRadius: 100,
      position: 'absolute',
      left: 0,
      top: -100,
      opacity: 0.6,
    },
    circleTwo: {
      backgroundColor: colors.primary,
      width: 200,
      height: 200,
      borderRadius: 100,
      position: 'absolute',
      left: -100,
      top: 0,
      opacity: 0.6,
    },
  });

  return (
    <>
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />
    </>
  );
};

export default Circles;
