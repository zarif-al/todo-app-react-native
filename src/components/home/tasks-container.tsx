import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
  });

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
                <CheckBox
                  key={index}
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
                    setTaskInput(item.name);
                    setTaskIndex(index);
                    setEditModalOpen(true);
                  }}
                  containerStyle={styles.listItem}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TasksContainer;
