import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { AuthContext } from 'src/contexts/auth';
import { ThemeContext } from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';
import { TaskType } from 'src/components/home/utils/types';
import Welcome from 'src/components/home/welcome';
import TasksContainer from 'src/components/home/tasks-container';
import AddModal from 'src/components/home/add-modal';
import EditModal from 'src/components/home/edit-modal';
import { Icon } from 'react-native-elements';

const HomeScreenComponent = () => {
  const { signOut, user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const [array, setArray] = useState<TaskType[]>([]);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState('');
  const [taskIndex, setTaskIndex] = useState<number | null>(null);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 20,
      color: colors.text,
      fontWeight: 'bold',
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
      {!user ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
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
              setAddModalOpen={setAddModalOpen}
              setEditModalOpen={setEditModalOpen}
              setTaskIndex={setTaskIndex}
              setTaskInput={setTaskInput}
              colors={colors}
            />
          </View>
          <AddModal
            visible={addModalOpen}
            setVisible={setAddModalOpen}
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            array={array}
            setArray={setArray}
          />
          <EditModal
            taskIndex={taskIndex}
            visible={editModalOpen}
            setVisible={setEditModalOpen}
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            array={array}
            setArray={setArray}
          />
        </>
      )}
    </View>
  );
};

export default HomeScreenComponent;
