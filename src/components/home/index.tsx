import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from 'src/contexts/auth';
import { ThemeContext } from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';
import { TaskType } from 'src/components/home/utils/types';
import Welcome from 'src/components/home/welcome';
import TasksContainer from 'src/components/home/tasks-container';
import Modal from 'src/components/home/modal';
import { Icon } from 'react-native-elements';

const HomeScreenComponent = () => {
  const { signOut, user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const [array, setArray] = useState<TaskType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState('');

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
    signOutContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 5,
      padding: 10,
    },
  });

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

  return (
    <View style={styles.container}>
      <Circles />
      <View style={styles.signOutContainer}>
        <Pressable onPress={() => signOut()}>
          <Icon name="sign-out" type="font-awesome" color="white" />
        </Pressable>
      </View>
      <View style={styles.firstContainer}>
        <Welcome colors={colors} user={user} />
      </View>
      <View style={styles.secondContainer}>
        <TasksContainer
          array={array}
          setArray={setArray}
          setVisible={setVisible}
          colors={colors}
        />
      </View>
      <Modal
        visible={visible}
        setVisible={setVisible}
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        array={array}
        setArray={setArray}
      />
    </View>
  );
};

export default HomeScreenComponent;
