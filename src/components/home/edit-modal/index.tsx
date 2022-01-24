import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { EditModalComponentTypes } from 'src/components/home/utils/types';
import EditTaskModal from 'src/components/home/edit-modal/edit-task-modal';

const EditModal = ({
  taskId,
  visible,
  setVisible,
  taskInput,
  setTaskInput,
  userId,
  onUpdateTodo,
}: EditModalComponentTypes) => {
  const styles = StyleSheet.create({
    modalStyle: {
      borderRadius: 10,
      padding: 15,
      width: '85%',
    },
  });
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={(): void => {
        setVisible(false);
      }}
      overlayStyle={styles.modalStyle}>
      <EditTaskModal
        taskId={taskId}
        setVisible={setVisible}
        input={taskInput}
        setInput={setTaskInput}
        userId={userId}
        onUpdateTodo={onUpdateTodo}
      />
    </Overlay>
  );
};

export default EditModal;
