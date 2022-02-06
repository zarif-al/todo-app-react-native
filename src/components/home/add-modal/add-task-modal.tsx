import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ButtonStyled, TextInputStyled } from 'src/components/_root';
import { ICreateTodoInput } from 'src/utils/types/schema';

interface Props {
  setVisible: (visible: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  onCreateTodo: (todo: ICreateTodoInput) => void;
}

const AddTaskModal = ({ setVisible, input, setInput, onCreateTodo }: Props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      marginBottom: 5,
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
  });
  return (
    <>
      <Text style={styles.text}>Add Task</Text>
      <TextInputStyled
        setValue={setInput}
        value={input}
        placeholder="New Task"
      />
      <View style={styles.buttonContainer}>
        <ButtonStyled
          title="Add"
          fontSize={15}
          onPress={() => {
            if (input.length > 0) {
              onCreateTodo({
                task: input.trim(),
                completed: false,
              });
              setInput('');
              setVisible(false);
            }
          }}
        />
        <ButtonStyled
          variant="danger-outlined"
          title="Cancel"
          fontSize={15}
          onPress={() => {
            setInput('');
            setVisible(false);
          }}
        />
      </View>
    </>
  );
};

export default AddTaskModal;
