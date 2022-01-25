import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { DeleteModalComponentTypes } from 'src/components/home/utils/types';
import { ButtonStyled } from 'src/components/_root';

const DeleteModal = ({
  userId,
  taskId,
  visible,
  setVisible,
  onDeleteTodo,
}: DeleteModalComponentTypes) => {
  const styles = StyleSheet.create({
    modalStyle: {
      borderRadius: 10,
      padding: 15,
      width: '60%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    text: {
      fontSize: 15,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
    },
  });
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={(): void => {
        setVisible(false);
      }}
      overlayStyle={styles.modalStyle}>
      <Text style={styles.text}>
        Are you sure you want to delete this task?
      </Text>

      <View style={styles.buttonContainer}>
        <ButtonStyled
          variant="danger-outlined"
          title="Confirm"
          fontSize={13}
          onPress={() => {
            if (taskId) {
              onDeleteTodo({ userId: userId, id: taskId });
              setVisible(false);
            }
          }}
        />
        <ButtonStyled
          variant="outlined"
          title="Cancel"
          fontSize={13}
          onPress={() => {
            setVisible(false);
          }}
        />
      </View>
    </Overlay>
  );
};

export default DeleteModal;
