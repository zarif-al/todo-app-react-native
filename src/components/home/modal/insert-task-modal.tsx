import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ButtonStyled, TextInputStyled } from 'src/components/_root';

interface Props {
  setVisible: (visible: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  array: Array<{ name: string; completed: boolean }>;
  setArray: (array: Array<{ name: string; completed: boolean }>) => void;
}

const InsertTaskModal = ({
  setVisible,
  input,
  setInput,
  array,
  setArray,
}: Props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      marginBottom: 5,
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });
  return (
    <>
      <Text style={styles.text}>Add Task</Text>
      <TextInputStyled
        setValue={setInput}
        value={input}
        placeholder="New Task"
        /*  error={error ? true : false} */
      />
      <View style={styles.buttonContainer}>
        <ButtonStyled
          title="Add"
          onPress={() => {
            if (input.length > 0) {
              const tempArray = [...array];
              tempArray.push({
                name: input,
                completed: false,
              });
              setArray(tempArray);
              setVisible(false);
            }
          }}
        />
        <ButtonStyled
          variant="danger-outlined"
          title="Cancel"
          onPress={() => {
            setInput('');
            setVisible(false);
          }}
        />
      </View>
    </>
  );
};

export default InsertTaskModal;
