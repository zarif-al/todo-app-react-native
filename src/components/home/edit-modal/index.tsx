import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ModalComponentTypes } from 'src/components/home/utils/types';
import EditTaskModal from 'src/components/home/edit-modal/edit-task-modal';

const EditModal = ({
  taskIndex,
  visible,
  setVisible,
  taskInput,
  setTaskInput,
  array,
  setArray,
}: ModalComponentTypes) => {
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
        taskIndex={taskIndex}
        setVisible={setVisible}
        input={taskInput}
        setInput={setTaskInput}
        array={array}
        setArray={setArray}
      />
    </Overlay>
  );
};

export default EditModal;
