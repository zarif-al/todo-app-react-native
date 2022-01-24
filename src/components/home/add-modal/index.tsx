import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { AddModalComponentTypes } from 'src/components/home/utils/types';
import AddTaskModal from 'src/components/home/add-modal/add-task-modal';

const AddModal = ({
  visible,
  setVisible,
  taskInput,
  setTaskInput,
  array,
  setArray,
}: AddModalComponentTypes) => {
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
      <AddTaskModal
        setVisible={setVisible}
        input={taskInput}
        setInput={setTaskInput}
        array={array}
        setArray={setArray}
      />
    </Overlay>
  );
};

export default AddModal;
