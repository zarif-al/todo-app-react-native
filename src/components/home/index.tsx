import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { AuthContext } from 'src/contexts/auth';
import { UserContext } from 'src/contexts/user';
import { ThemeContext } from 'src/contexts/theme';
import Circles from 'src/components/_root/circles';
import Welcome from 'src/components/home/welcome';
import TasksContainer from 'src/components/home/tasks-container';
import AddModal from 'src/components/home/add-modal';
import EditModal from 'src/components/home/edit-modal';
import DeleteModal from 'src/components/home/delete-modal';
import { Icon } from 'react-native-elements';

const HomeScreenComponent = () => {
  const { signOut, user } = useContext(AuthContext);
  const { onCreateTodo, onUpdateTodo, onDeleteTodo } = useContext(UserContext);
  const { colors } = useContext(ThemeContext);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState('');
  const [taskId, setTaskId] = useState<string | null>(null);
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
              todos={user.todos}
              onUpdateTodo={onUpdateTodo}
              setAddModalOpen={setAddModalOpen}
              setEditModalOpen={setEditModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
              setTaskId={setTaskId}
              setTaskInput={setTaskInput}
              colors={colors}
            />
          </View>
          <AddModal
            visible={addModalOpen}
            setVisible={setAddModalOpen}
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            onCreateTodo={onCreateTodo}
          />
          <EditModal
            taskId={taskId}
            visible={editModalOpen}
            setVisible={setEditModalOpen}
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            onUpdateTodo={onUpdateTodo}
          />
          <DeleteModal
            taskId={taskId}
            visible={deleteModalOpen}
            setVisible={setDeleteModalOpen}
            onDeleteTodo={onDeleteTodo}
          />
        </>
      )}
    </View>
  );
};

export default HomeScreenComponent;
