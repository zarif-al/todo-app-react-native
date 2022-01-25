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
import {
  TaskListComponentTypes,
  AnimatedViewProps,
} from 'src/components/home/utils/types';

const TasksContainer = ({
  colors,
  setAddModalOpen,
  setEditModalOpen,
  setDeleteModalOpen,
  setTaskInput,
  setTaskId,
  todos,
  onUpdateTodo,
  userId,
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
    noTaskContainer: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    noTaskText: {
      fontSize: 13,
      opacity: 0.7,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
  // TODO : Fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fadeAnim = useRef<any>([]);
  fadeAnim.current = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posAnim = useRef<any>([]);
  posAnim.current = [];

  function AnimatedView({ style, index, children }: AnimatedViewProps) {
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

  const fadeIn = (index: number) => {
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

  const fadeOut = (index: number) => {
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

  const TodoList = (): JSX.Element => {
    if (todos) {
      if (todos.length === 0) {
        return (
          <View style={styles.noTaskContainer}>
            <Text style={styles.noTaskText}>
              You can start adding tasks by clicking plus icon above.
            </Text>
          </View>
        );
      } else {
        return (
          <ScrollView style={styles.scrollView}>
            <View style={styles.listContainer}>
              {todos.map((item, index) => {
                return (
                  <View style={styles.checkBoxContainer} key={index}>
                    <CheckBox
                      center
                      title={item.task}
                      checked={item.completed}
                      checkedColor={colors.background2}
                      onPress={() => {
                        onUpdateTodo({
                          userId: userId,
                          id: item.id,
                          completed: !item.completed,
                        });
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
                      <ButtonStyled
                        icon={
                          <Icon
                            name="edit"
                            type="font-awesome"
                            color={colors.text}
                          />
                        }
                        onPress={() => {
                          setTaskInput(item.task);
                          setTaskId(item.id);
                          setEditModalOpen(true);
                        }}
                        marginRight={10}
                      />
                      <ButtonStyled
                        icon={
                          <Icon
                            name="trash"
                            type="font-awesome"
                            color={colors.danger}
                          />
                        }
                        onPress={() => {
                          setTaskId(item.id);
                          setDeleteModalOpen(true);
                        }}
                      />
                    </AnimatedView>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        );
      }
    } else {
      return (
        <View style={styles.noTaskContainer}>
          <Text style={styles.noTaskText}>
            There was an error retrieving your tasks. Please contact admin.
          </Text>
        </View>
      );
    }
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
        <TodoList />
      </View>
    </>
  );
};

export default TasksContainer;
