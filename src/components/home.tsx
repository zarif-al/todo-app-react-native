import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from 'src/contexts/auth';
import { ThemeContext } from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';
import { Avatar, CheckBox, Icon, Overlay } from 'react-native-elements';
import { ButtonStyled } from 'src/components/_root';
import InsertTaskModal from 'src/components/insert-task-modal';
interface TaskType {
  name: string;
  completed: boolean;
}

const HomeScreenComponent = () => {
  const { user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const [array, setArray] = useState<TaskType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState('');
  useEffect(() => {
    const tempArray = [];
    if (array.length === 0) {
      for (let i = 0; i < 5; i++) {
        tempArray.push({
          name: 'Item ' + i,
          completed: i % 2 === 0 ? true : false,
        });
      }
      setArray(tempArray);
    }
  }, [array]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
    },
    firstContainer: {
      flex: 0.4,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.background2,
    },
    secondContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: colors.background,
      flex: 0.6,
      padding: 24,
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
    modalStyle: {
      borderRadius: 10,
      padding: 15,
      width: '85%',
    },
    text: {
      fontSize: 18,
      marginBottom: 5,
      color: 'black',
    },
    headingOne: {
      fontSize: 25,
      color: 'white',
      fontFamily: 'sans-serif-condensed',
      marginTop: 24,
      marginBottom: 12,
    },
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
    headingThree: {
      fontSize: 20,
      opacity: 0.7,
      fontWeight: '700',
      color: 'black',
      fontFamily: 'sans-serif-condensed',
    },
    iconContainer: {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.background,
    },
    scrollView: {
      width: 300,
      height: 50,
    },
    listContainer: {
      padding: 20,
    },
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 15,
    },
    listItem: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0,
      alignSelf: 'flex-start',
    },
  });
  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.firstContainer}>
        <Avatar
          size={100}
          rounded
          icon={{
            name: 'user',
            type: 'font-awesome',
            color: colors.background2,
          }}
          containerStyle={styles.iconContainer}
        />
        <Text style={styles.headingOne}>
          Welcome {user.firstName + ' ' + user.lastName}
        </Text>
      </View>
      <View style={styles.secondContainer}>
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
                    containerStyle={styles.listItem}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={(): void => {
          setVisible(false);
        }}
        overlayStyle={styles.modalStyle}>
        <InsertTaskModal
          setVisible={setVisible}
          input={taskInput}
          setInput={setTaskInput}
          array={array}
          setArray={setArray}
        />
      </Overlay>
    </View>
  );
};

export default HomeScreenComponent;
