import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ButtonStyled, TextInputStyled } from 'src/components/_root';
import { IUpdateTodoInput } from 'src/utils/types/schema';

interface Props {
  setVisible: (visible: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  taskId: string | null;
  onUpdateTodo: (todoUpdate: IUpdateTodoInput) => void;
}

const EditTaskModal = ({
  setVisible,
  input,
  setInput,
  onUpdateTodo,
  taskId,
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
      marginTop: 10,
    },
  });
  return (
    <>
      <Text style={styles.text}>Edit Task</Text>
      <TextInputStyled
        setValue={setInput}
        value={input}
        placeholder="New Task"
        /*  error={error ? true : false} */
      />
      <View style={styles.buttonContainer}>
        <ButtonStyled
          title="Confirm"
          fontSize={18}
          onPress={() => {
            if (input.length > 0 && taskId !== null) {
              onUpdateTodo({
                id: taskId,
                task: input,
              });
              setVisible(false);
              setInput('');
            }
          }}
        />
        <ButtonStyled
          variant="danger-outlined"
          title="Cancel"
          fontSize={18}
          onPress={() => {
            setInput('');
            setVisible(false);
          }}
        />
      </View>
    </>
  );
};

export default EditTaskModal;
