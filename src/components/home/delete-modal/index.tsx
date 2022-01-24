import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ModalComponentTypes } from 'src/components/home/utils/types';
import { ButtonStyled } from 'src/components/_root';

const DeleteModal = ({
  taskIndex,
  visible,
  setVisible,
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
      <Text style={styles.text}>Delete Task</Text>

      <View style={styles.buttonContainer}>
        <ButtonStyled
          variant="danger-outlined"
          title="Confirm"
          fontSize={18}
          onPress={() => {
            const tempArray = array.filter((_, index) => index !== taskIndex);
            setArray(tempArray);
            setVisible(false);
          }}
        />
        <ButtonStyled
          title="Cancel"
          fontSize={18}
          onPress={() => {
            setVisible(false);
          }}
        />
      </View>
    </Overlay>
  );
};

export default DeleteModal;