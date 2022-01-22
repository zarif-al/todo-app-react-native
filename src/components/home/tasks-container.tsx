import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { ButtonStyled } from 'src/components/_root';
import { TaskListComponentTypes } from 'src/components/home/utils/types';

const TasksContainer = ({
  colors,
  setVisible,
  array,
  setArray,
}: TaskListComponentTypes) => {
  const ANIM_TIMING = 300;
  const styles = StyleSheet.create({
    headingTwo: {
      fontSize: 23,
      opacity: 0.8,
      fontWeight: '700',
      color: 'black',
      fontFamily: 'sans-serif-condensed',
      marginTop: 24,
      marginBottom: 15,
      alignSelf: 'flex-start',
    },
    thirdContainer: {
      width: 300,
      flex: 1,
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingBottom: 15,
      elevation: 10,
    },
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 15,
    },
    headingThree: {
      fontSize: 20,
      opacity: 0.7,
      fontWeight: '700',
      color: 'black',
      fontFamily: 'sans-serif-condensed',
    },
    scrollView: {
      width: 300,
      height: 50,
    },
    listContainer: {
      padding: 20,
    },
    listItem: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0,
      alignSelf: 'flex-start',
    },
    checkBoxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'red',
    },
    iconContainer: {
      flexDirection: 'row',
    },
    iconStyle: {
      marginRight: 10,
    },
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const posAnim = useRef(new Animated.Value(-100)).current;
  function AnimatedView(props) {
    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          right: posAnim, // Bind opacity to animated value
          opacity: fadeAnim,
        }}>
        {props.children}
      </Animated.View>
    );
  }

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(posAnim, {
        toValue: 10,
        duration: ANIM_TIMING,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIM_TIMING,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(posAnim, {
        toValue: -100,
        duration: ANIM_TIMING,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: ANIM_TIMING,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <>
      <Text style={styles.headingTwo}>Tasks List</Text>
      <View style={styles.thirdContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.headingThree}>Daily Tasks</Text>
          <ButtonStyled
            icon={
              <Icon
                name="plus-circle"
                type="font-awesome"
                color={colors.background2}
              />
            }
            onPress={() => {
              setVisible(true);
            }}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.listContainer}>
            {array.map((item, index) => {
              return (
                <View style={styles.checkBoxContainer} key={index}>
                  <CheckBox
                    center
                    title={item.name}
                    checked={item.completed}
                    checkedColor={colors.background2}
                    onPress={() => {
                      array[index].completed =
                        array[index].completed === false ? true : false;
                      setArray([...array]);
                    }}
                    onLongPress={() => {
                      fadeIn();
                      setTimeout(() => {
                        fadeOut();
                      }, 3000);
                    }}
                    containerStyle={styles.listItem}
                  />
                  <AnimatedView style={styles.iconContainer}>
                    <Icon
                      name="edit"
                      type="font-awesome"
                      color={colors.text}
                      containerStyle={styles.iconStyle}
                    />
                    <Icon
                      name="trash"
                      type="font-awesome"
                      color={colors.danger}
                    />
                  </AnimatedView>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TasksContainer;
