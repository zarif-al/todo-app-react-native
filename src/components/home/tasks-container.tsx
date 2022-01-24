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
  setAddModalOpen,
  setEditModalOpen,
  setTaskInput,
  setTaskIndex,
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
    },
    iconContainer: {
      flexDirection: 'row',
    },
    iconStyle: {
      marginRight: 10,
    },
  });

  const fadeAnim = useRef([]);
  fadeAnim.current = [];
  const posAnim = useRef([]);
  posAnim.current = [];

  function AnimatedView({ style, index, children }) {
    fadeAnim.current.push(new Animated.Value(0));
    posAnim.current.push(new Animated.Value(-100));
    return (
      <Animated.View // Special animatable View
        style={{
          ...style,
          right: posAnim.current[index], // Bind opacity to animated value
          opacity: fadeAnim.current[index],
        }}>
        {children}
      </Animated.View>
    );
  }

  const fadeIn = index => {
    Animated.parallel([
      Animated.timing(posAnim.current[index], {
        toValue: 10,
        duration: ANIM_TIMING,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(fadeAnim.current[index], {
        toValue: 1,
        duration: ANIM_TIMING,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const fadeOut = index => {
    Animated.parallel([
      Animated.timing(posAnim.current[index], {
        toValue: -100,
        duration: ANIM_TIMING,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(fadeAnim.current[index], {
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
              setAddModalOpen(true);
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
                      fadeIn(index);
                      setTimeout(() => {
                        fadeOut(index);
                      }, 3000);
                    }}
                    containerStyle={styles.listItem}
                  />
                  <AnimatedView style={styles.iconContainer} index={index}>
                    <Icon
                      name="edit"
                      type="font-awesome"
                      color={colors.text}
                      containerStyle={styles.iconStyle}
                      onPress={() => {
                        setTaskInput(item.name);
                        setTaskIndex(index);
                        setEditModalOpen(true);
                      }}
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
