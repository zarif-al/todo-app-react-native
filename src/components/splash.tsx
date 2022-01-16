import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'src/components/_root';
import { ThemeContext } from 'src/contexts/theme';

const Splash = () => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
  return (
    <View style={styles.container}>
      <Header content="PortfolioApp" color={colors.tertiary} />
    </View>
  );
};

export default Splash;
